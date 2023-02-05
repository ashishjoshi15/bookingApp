/* eslint-disable prettier/prettier */
import { Body, Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { query } from 'express';
import { Model } from 'mongoose';
import { HotelsDTO } from '../dto/hotel.create.dto';
import { HotelsDocument, HotelsEntity } from '../schema/hotel.schema';


@Injectable()
export class HotelsService {
    constructor(
     @InjectModel(HotelsEntity.name)private readonly hotelModel:Model<HotelsDocument>
    ){}
    async createHotel(@Body() hotelsdto:HotelsDTO){
        const newHotel=await new this.hotelModel(hotelsdto)
        return newHotel.save()

    }
    async getHotelsList(page,limit,find){
        page =
            page > 5
                ? 5 : page;
                limit =
                limit > 20
                ? 20
                : limit;
        const skip:number = (page - 1) * limit;

        const hotels=await this.hotelModel.find(find).limit(limit).skip(skip)
        return hotels
    }
    async getHotelById(id){
        const hotel=await this.hotelModel.findById(id)
        if(!hotel){
            return "!user dose not exists"
        }
        return hotel
    }
    async deleteHotelById(id){
        const deletehotel=await this.hotelModel.findByIdAndDelete(id)
        if(!deletehotel){
            return 'user dose not exists'
        }
        return 'user deleted successfully'
    }
    async updateById(id,hotelDto:HotelsDTO){
        const updatehotel = await this.hotelModel.findByIdAndUpdate(id,hotelDto,{new:true})
        if(!updatehotel){
            return 'user dose not exits'
        }
        return {massege:'user update succesfully',updatehotel}
    }
}