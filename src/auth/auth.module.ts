/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { Mongoose } from "mongoose";
import { UserController } from "src/users/controller/user.controller";
import { UserEntity, UserSchema } from "src/users/schema/user.schema";
import { UserService } from "src/users/service/user.service";
import { AuthController } from "./controller/auth.contorller";
import { LocalStrategy } from "./local.strategy";
import { AuthService } from "./service/auth.service";


@Module({
    controllers: [AuthController],
    providers: [UserService,AuthService,LocalStrategy],
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
   JwtModule.register({
    secret:"secret",
    signOptions:{expiresIn:"1d"}
   }),PassportModule ],
   exports:[AuthService]
})
export class AuthModule{}