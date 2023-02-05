/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { verifyAdminToken } from "src/utils/verfyTokenAdmin.middlware";
import { verifyUserToken } from "src/utils/verifyToken.midleware";
import { RoomsEntity, RoomsSchema } from "./schema/rooms.schema";



@Module({
    controllers: [],
    providers: [,JwtService],
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
export class RoomsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(verifyAdminToken)
        .exclude(
            { path: 'hotel/getAll', method: RequestMethod.GET }
        )
        .forRoutes();

        consumer
        .apply(verifyUserToken)
        .forRoutes({ path: 'hotel/getAll', method: RequestMethod.GET })
    }
  }