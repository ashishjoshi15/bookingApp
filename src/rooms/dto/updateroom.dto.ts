/* eslint-disable prettier/prettier */
import { IsBoolean, isEmpty, IsEmpty, IsMongoId, IsNotEmpty, IsNotIn, IsNumber, IsOptional, IsString, IS_EMPTY } from "class-validator";
import { ObjectId } from "mongoose";
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