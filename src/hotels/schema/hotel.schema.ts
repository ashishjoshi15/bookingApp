/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class HotelsEntity{
    @Prop({
        required: false,
        })
    name: string;

    @Prop({
        required: false,
    })
    price:number

    @Prop({
        required: false,
    })
    type: string;
    @Prop({
        required: false,
       
    })
    city: string;

    @Prop({
        required: false,
    })
    address: string;

    @Prop({
        required: false,
        
    })
    distance: string;
    
    @Prop({
        required:false
    })
    photos:[string]

    @Prop({
        required: false,
    })
    title: string;
   
    @Prop({
        required:false
    })
    desc:string

    @Prop({
        required: false,
        min:0,
        max:5
    })
    rating: number;

    @Prop({
        required:false
    })
    rooms:[string]

    @Prop({
        required: false,
    })
    cheapestPrice: string;

    @Prop({
        required: false,
        default:false
    })
    featured: boolean;
}

export const HotelsSchema=SchemaFactory.createForClass(HotelsEntity)
export type HotelsDocument = HotelsEntity & Document
