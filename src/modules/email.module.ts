// email.module.ts
import { Module } from '@nestjs/common';
import { SesService } from '../services/ses.service';
import { AwsConfigService } from '../utils/aws.config';

@Module({
  providers: [SesService, AwsConfigService],
  exports: [SesService],
})
export class EmailModule {}
