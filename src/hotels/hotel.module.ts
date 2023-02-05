/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { UserEntity, UserSchema } from "src/users/schema/user.schema";
import { UserService } from "src/users/service/user.service";
import { verifyAdminToken } from "src/utils/verfyTokenAdmin.middlware";
import { verifyUserToken } from "src/utils/verifyToken.midleware";
//import {  } from "src/utils/verifyToken.midleware";
import { HotelController } from "./controller/hotel.controller";
import {  HotelsEntity, HotelsSchema } from "./schema/hotel.schema";
import { HotelsService } from "./service/hotel.service";


@Module({
    controllers: [HotelController],
    providers: [HotelsService,JwtService],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: HotelsEntity.name,
                    schema: HotelsSchema,
                    collection:'hotels'
                    
                },
                {
                    name: UserEntity.name,
                    schema: UserSchema,
                    collection:'users'
                    
                },
            ]
        ),
    ],
})
export class HotelsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(verifyAdminToken)
        .exclude(
            { path: 'hotel/getAll', method: RequestMethod.GET }
        )
        .forRoutes(HotelController);

        consumer
        .apply(verifyUserToken)
        .forRoutes({ path: 'hotel/getAll', method: RequestMethod.GET })
    }
  }