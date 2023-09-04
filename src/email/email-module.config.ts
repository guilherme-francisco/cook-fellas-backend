import { ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';

export const mailerModuleConfig = async (
  configService: ConfigService,
): Promise<MailerOptions> => {
  return {
    transport: {
      host: configService.get<string>('AWS_MAIL_HOST'),
      port: parseInt(configService.get<string>('AWS_MAIL_PORT')),
      secure: false,
      tls: {
        ciphers: 'SSLv3',
      },
      auth: {
        user: configService.get<string>('AWS_MAIL_USER'),
        pass: configService.get<string>('AWS_MAIL_PASS'),
      },
    },
  };
};
