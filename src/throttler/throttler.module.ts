import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule as NestThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    NestThrottlerModule.forRoot([{
      ttl: 60, // tiempo en segundos
      limit: 10, // número máximo de solicitudes en el período ttl
    }]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ThrottlerModule {}