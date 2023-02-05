/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserEntity{
    @Prop({
        required: true
        })
    userName: string;

    @Prop({
        required: true,
        unique:true
    })
    email:string;

    @Prop({
        required: true
    })
    password: string;
   
    @Prop({
        required: false,
        default:false
    })
    IsAdmin: boolean;

    @Prop({
        required:true,
        unique:true
    })
    phone:string

    @Prop({
        required:false,
        unique:false
    })
    prefix:string

    @Prop({
        required:true,
        unique:false
    })
    language:string
}

export const UserSchema=SchemaFactory.createForClass(UserEntity)
export type UserDocument = UserEntity & Document
