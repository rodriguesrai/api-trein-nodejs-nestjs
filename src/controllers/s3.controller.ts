import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../services/s3.service';
import { Multer } from 'multer';

@Controller('files')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Multer.File): Promise<string> {
    const bucketName = process.env.S3_BUCKET_NAME;

    try {
      const fileUrl = await this.s3Service.uploadFileToS3(file, bucketName);
      return fileUrl;
    } catch (error) {
      // Trate o erro conforme necessário
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}
