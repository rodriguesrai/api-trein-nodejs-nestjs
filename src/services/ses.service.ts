// ses.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { AwsConfigService } from '../utils/aws.config';

@Injectable()
export class SesService {
  private ses: AWS.SES;
  private readonly logger = new Logger(SesService.name);
  private defaultSubject: string = 'Bem-vindo à nossa plataforma';
  private defaultBody: string =
    'Olá,\n\nBem-vindo à nossa plataforma! Esperamos que tenha uma excelente experiência.\n\nAtenciosamente,\nEquipe de Suporte Areopagus.';
  constructor(
    private configService: ConfigService,
    private awsConfigService: AwsConfigService,
  ) {
    this.ses = new AWS.SES(this.awsConfigService.getAwsConfig());
  }

  async sendEmailCreatedUser(to: string): Promise<void> {
    const params = {
      Source: this.configService.get<string>('EMAIL_SOURCE'),
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: this.defaultSubject,
        },
        Body: {
          Text: {
            Data: this.defaultBody,
          },
        },
      },
    };

    try {
      const result = await this.ses.sendEmail(params).promise();
      if (result) {
        this.logger.log(
          `Email sent successfully to ${to}`,
          JSON.stringify(result),
        );
      }
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error);
    }
  }
}
