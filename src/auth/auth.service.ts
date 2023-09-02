import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignupDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignupDto) {
    // generate the password harsh
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
          name: dto.name,
        },
      });
      delete user.hash;
      // send the token
      const token: string = await this.signToken(user.id, user.email);
      return {
        access_token: token,
        user: user,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(dto: LoginDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }
    // send the token
    delete user.hash;
    const token: string = await this.signToken(user.id, user.email);
    return {
      access_token: token,
      user: user,
    };
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return token;
  }
}
