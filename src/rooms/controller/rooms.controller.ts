/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { title } from "process";
import { retry, retryWhen } from "rxjs";
import { PaginationParams } from "src/paginationParams.dto";
import { serialize } from "v8";
import { RoomsCreateDto } from "../dto/create.room.dto";
import { RoomsUpdateDto } from "../dto/updateroom.dto";
import { RoomsService } from "../service/rooms.service";

@Controller('/rooms')
export class RoomsController {
    constructor(
        private readonly roomsService: RoomsService
    ) { }
    @Post('/create')
    async createRoom(@Body() body: RoomsCreateDto) {

        const data = await this.roomsService.createRoom(body)
        return data
    }

    @Get('/:id')
    async getRoomByhotel(@Param('id') id) {
        const data = await this.roomsService.getRoomsByHotel(id)
        return data
    }

    @Patch('update/:id')
    async updateRoom(@Body() body: RoomsUpdateDto, @Param('id') Id) {
        const data = await this.roomsService.updateRoom(body, Id)
        return data
    }

    @Get('get')
    async getaAllrooms(@Query() { page, limit }: PaginationParams) {
        const data = await this.roomsService.getAllRooms(page, limit)
        return data
    }
    @Delete('delete/:hotelId/:roomId')
    async deleteRoom(
        @Param('hotelId') hotelId,
        @Param('roomId') roomId) {
        const data = await this.roomsService.deleteRoom(roomId, hotelId)
        return data
    }

}


