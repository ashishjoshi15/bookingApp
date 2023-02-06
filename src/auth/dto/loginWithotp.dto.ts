/* eslint-disable prettier/prettier */
import {  IsNotEmpty, IsString, ValidateIf } from "class-validator";


export class LoginWithOtp{
    @IsNotEmpty()
    phone:string;

    
  
    @IsNotEmpty()
    prefix:string;

    @IsString()
    token:"string"

   
}