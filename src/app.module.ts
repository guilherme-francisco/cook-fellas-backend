import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RecipeModule } from './recipe/recipe.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';
import { mailerModuleConfig } from './email/email-module.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        await mailerModuleConfig(configService),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    RecipeModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
