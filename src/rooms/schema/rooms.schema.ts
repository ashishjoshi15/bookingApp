/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { time } from "console";
import { ObjectId } from "mongoose";

@Schema()
export class RoomsEntity{
    @Prop({
        required: true
        })
    title: string;

    @Prop({
        required: false,
        unique:false
    })
    price:number

    @Prop({
        required: false,
        unique:false
    })
    maxPeople: number;
   
    @Prop({
        required: false
    })
    desc: string;
    @Prop({
        required:true,
        unique:false
    })
    hotel_id:string;
    
    @Prop({
        required:true,   
    })
    roomNumbers: [
        { number: Number,
         unavailableDates: {type: [Date]}}
    ];
    @Prop({ 
    })
    timestamps:true
    
    
}

export const RoomsSchema=SchemaFactory.createForClass(RoomsEntity)
export type RoomsDocument = RoomsEntity & Document
