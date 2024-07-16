import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsConfigService {
  private readonly awsConfig: AWS.Config;

  constructor(private readonly configService: ConfigService) {
    this.awsConfig = new AWS.Config({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get<string>('AWS_REGION'),
    });
  }

  getAwsConfig(): AWS.Config {
    return this.awsConfig;
  }
}
