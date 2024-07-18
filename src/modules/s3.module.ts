import { Module } from '@nestjs/common';
import { S3Controller } from '../controllers/s3.controller';
import { S3Service } from '../services/s3.service';
import { AwsConfigService } from '../utils/aws.config';

@Module({
  controllers: [S3Controller],
  providers: [S3Service, AwsConfigService],
})
export class S3Module {}
