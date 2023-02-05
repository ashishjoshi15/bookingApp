/* eslint-disable prettier/prettier */
import {  IsNotEmpty, IsString } from "class-validator";


export class ForgetPasswordDto{
    @IsNotEmpty()
    @IsNotEmpty()
    phone:string;

    @IsString()
    @IsNotEmpty()
    token:"string"

    @IsString()
    @IsNotEmpty()
    otp:string

    @IsString()
    @IsNotEmpty()
    password:string

   

   
}