import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '../database/mongodb/schemas/book.schema';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  exports: [DataBaseMongoModule],
})
export class DataBaseMongoModule {}
