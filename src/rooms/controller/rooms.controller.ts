/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { title } from "process";
import { PaginationParams } from "src/paginationParams.dto";
import { serialize } from "v8";
import { RoomsCreateDto } from "../dto/create.room.dto";
import { RoomsService } from "../service/rooms.service";

@Controller('/hotel')
export class RoomsController{
    constructor(
        private readonly roomsService:RoomsService
    ){}
    @Post('/create')
    async createRoom(@Body() body:RoomsCreateDto ){
        const data = await this.roomsService.createRoom(body)
        return data
    }
   
}
    

