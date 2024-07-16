import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerService } from 'src/services/queuer/producer.service';
import { ConsumerService } from 'src/services/queuer/consumer.service';
import { EmailModule } from './email.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'user_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    EmailModule,
  ],
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class RabbitMQModule {}
