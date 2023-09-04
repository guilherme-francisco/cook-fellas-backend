import { MailerService } from '@nestjs-modules/mailer';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'prisma/prisma-client';
import HTML_SIGN_UP_PAGE from 'src/static/html-sign-up-page';
@Injectable()
export class EmailService {
  constructor(
    private emailService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendSignUpEmailMessage(user: User): Promise<HttpStatus> {
    let makeup = HTML_SIGN_UP_PAGE;
    makeup = makeup.replace(
      'images/',
      `${this.configService.get<string>('BASE_URL')}/static/`,
    );
    return await this.emailService
      .sendMail({
        to: user.email,
        from: `"Cook Fellas" <${this.configService.get<string>(
          'COOK_FELLAS_EMAIL',
        )}>`,
        subject: `${user.name}, thank you for sign up`,
        html: makeup,
      })
      .then(() => HttpStatus.OK)
      .catch((error) => {
        console.log(error);
        return HttpStatus.BAD_REQUEST;
      });
  }
}
