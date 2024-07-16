// src/gateway/websockets.module.ts

import { Module } from '@nestjs/common';
import { MyGateway } from '../gateways/mygateway.gateway';

@Module({
  providers: [MyGateway],
})
export class WebsocketsGatewayModule {}
