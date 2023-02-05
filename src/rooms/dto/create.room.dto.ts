/* eslint-disable prettier/prettier */
import { IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ObjectId } from "mongoose";
export class RoomsCreateDto{
    @IsNotEmpty()
    @IsString()
    title:string

    @IsNotEmpty()
    @IsNumber()
    price:number

    @IsNotEmpty()
    @IsNumber()
    maxPeople:number

    @IsNotEmpty()
    @IsString()
    desc:number
    
    @IsNotEmpty()
    @IsString()
    hotel_id:string

    @IsNotEmpty()
    @IsString()
    room_id:string
}