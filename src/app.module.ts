import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './modules/cats.module';
import { AuthModule } from './modules/auth.module';
import { UsersModule } from './modules/users.module';
import { dataSourceOptions } from './typeOrm.config';
import { EmailModule } from './modules/email.module';
import { RabbitMQModule } from './modules/rabbitmq.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { DataBaseMongoModule } from './modules/databaseMongo.module';
import { WebsocketsGatewayModule } from './modules/websockets.module';
import { S3Module } from './modules/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    CatsModule,
    AuthModule,
    UsersModule,
    EmailModule,
    RabbitMQModule,
    DataBaseMongoModule,
    WebsocketsGatewayModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
