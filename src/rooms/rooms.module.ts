/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { verifyAdminToken } from "src/utils/verfyTokenAdmin.middlware";
import { verifyUserToken } from "src/utils/verifyToken.midleware";
import { RoomsController } from "./controller/rooms.controller";
import { RoomsEntity, RoomsSchema } from "./schema/rooms.schema";
import { RoomsService } from "./service/rooms.service";



@Module({
    controllers: [RoomsController],
    providers: [RoomsService,JwtService],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: RoomsEntity.name,
                    schema: RoomsSchema,
                    collection:'rooms'
                    
                }
            ]
        ),
    ],
})
export class RoomsModule {}