import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './utilities/config/app.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './utilities/exception Filters/http-exception.filter';
import { CompressionMiddleware } from './utilities/middleware/compression.middleware';
import { LoggingMiddleware } from './utilities/middleware/logging.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './api/User/user.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './api/User/Todo/todo.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TodoModule,
    
    // Mongoose config
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUri'),
      }),
      inject: [ConfigService],
    }),
    
    // Config Module to load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      cache: true,
    }),

    // Caching in Memory
    CacheModule.register({
      isGlobal: true,
    }),

    // Rate Limit APIs
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 10,
    }]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CompressionMiddleware).forRoutes('*');
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
