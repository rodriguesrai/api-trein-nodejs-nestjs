// ses.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { AwsConfigService } from '../utils/aws.config';

@Injectable()
export class SesService {
  private ses: AWS.SES;
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
      Source: 'rairodrigues@areopagus.tech',
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
      console.log(`Email sent successfully to ${to}`, result);
    } catch (error) {
      console.error(`Failed to send email to ${to}`, error);
    }
  }
}
