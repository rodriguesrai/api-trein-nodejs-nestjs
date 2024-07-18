import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { Multer } from 'multer';
import { AwsConfigService } from '../utils/aws.config';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor(
    private configService: ConfigService,
    private awsConfigService: AwsConfigService,
  ) {
    this.s3 = new AWS.S3(this.awsConfigService.getAwsConfig());
  }

  async uploadFileToS3(file: Multer.File, bucketName: string): Promise<string> {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: file.originalname,
      Body: file.buffer,
      ACL: 'public-read',
    };

    try {
      const data = await this.s3.upload(params).promise();
      console.log(`File uploaded successfully. Location: ${data.Location}`);
      return data.Location;
    } catch (error) {
      console.error(`Failed to upload file: ${error.message}`);
      throw error;
    }
  }
}
