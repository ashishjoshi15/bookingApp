/* eslint-disable prettier/prettier */
import { IsEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RoomsUpdateDto{
    @IsOptional()
    @IsString()
    title:string

    @IsOptional()
    @IsNumber()
    price:number

    @IsOptional()
    @IsNumber()
    maxPeople:number

    @IsOptional()
    @IsString()
    desc:number
    
    @IsEmpty()
    hotel_id:string

    @IsOptional()
    @IsString()
    room_id:string
}