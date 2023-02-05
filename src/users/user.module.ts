/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { verifyUserToken } from "src/utils/verifyToken.midleware";
import { UserController } from "./controller/user.controller";
//import { UserController } from "./user.controller";
import { UserEntity, UserSchema } from "./schema/user.schema";
import { UserService } from "./service/user.service";


@Module({
    controllers: [UserController],
    providers: [UserService,JwtService],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: UserEntity.name,
                    schema: UserSchema,
                    collection:'users'
                    
                },
            ]
        ),
    ],
})
export class UserModule  implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(verifyUserToken)
        .exclude(
            { path: 'user/getAll', method: RequestMethod.GET }
          )
          .forRoutes(UserController);
        
    }
  }