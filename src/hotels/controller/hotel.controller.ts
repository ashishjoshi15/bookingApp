/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { title } from "process";
import { PaginationParams } from "src/paginationParams.dto";
import { serialize } from "v8";
import { HotelsDTO } from "../dto/hotel.create.dto";
import { HotelsService } from "../service/hotel.service";

@Controller('/hotel')
export class HotelController{
    constructor(
        private readonly hotelService:HotelsService
    ){}
    @Post('/create')
    async createHotel(@Body() hotelDto:HotelsDTO ){
        const data = await this.hotelService.createHotel(hotelDto)
        return data
    }
    @Get('/getAll')
    async getAllHotel(@Query(){ page, limit, search }: PaginationParams){
        const find: Record<string, any> = {};
        
      if(search){
        
            find['$or']=[{
                  name:{
                    $regex: new RegExp(search),
                    $options: 'i',
                },
                type:{
                    $regex: new RegExp(search),
                    $options: 'i',
                }
            }
            ]
        
      }
        
        const data = await this.hotelService.getHotelsList(page,limit,find)
        return data
    }
    @Delete('/delete/:id')
    async deleteHotelById(@Param('id') id){
        return await this.hotelService.deleteHotelById(id)
    }

    @Patch('/update/:id')
    async updateHotelById(@Param('id') id,@Body() hotelDto:HotelsDTO){
        return await this.hotelService.updateById(id,hotelDto)
    }
}
    

