/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
//import { AuthController } from './auth/controller/auth.common.controller';

import { HotelsModule } from './hotels/hotel.module';
import { UserService } from './users/service/user.service';
import { UserModule } from './users/user.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
     })
  ,MongooseModule.forRoot(process.env.DB_CONNETION),
 HotelsModule,UserModule,AuthModule,JwtModule.register({
  secret:"secret",
  signOptions:{expiresIn:'1d'}
 })], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
