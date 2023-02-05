/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
export class HotelsDTO{
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
    city:string

    @IsNotEmpty()
    @IsNumber()
    rating:number

    @IsNotEmpty()
    rooms:[string]

    @IsNotEmpty()
    @IsNumber()
    price:number

    @IsNotEmpty()
    @IsString()
    cheapestPrice:string

    @IsString()
    desc:string
}