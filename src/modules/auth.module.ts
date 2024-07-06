import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UsersModule } from './users.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../middlewares/jwtAuthGuard.middleware';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '2d' },
    }),
    TypeOrmModule.forFeature([Users]), // Certifique-se de importar suas entidades corretamente
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AuthService,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
