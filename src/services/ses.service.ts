// ses.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class SesService {
  private ses: AWS.SES;

  constructor(private configService: ConfigService) {
    this.ses = new AWS.SES({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get<string>('AWS_REGION'),
    });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const params = {
      Source: 'your_verified_email@example.com',
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Text: {
            Data: body,
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
