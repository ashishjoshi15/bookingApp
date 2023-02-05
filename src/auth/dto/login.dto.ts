/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from "class-validator";


export class LoginWithPassword{
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;

   
}