/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";

export class UserDTO{
    @IsNotEmpty()
    @IsString()
    userName:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    phone:string

    @IsString()
    @IsNotEmpty()
    prefix:string

    @IsString()
    language:string
}