/* eslint-disable prettier/prettier */
import { Body, Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { query } from 'express';
import { Model } from 'mongoose';
import { RoomsCreateDto } from '../dto/create.room.dto';
import { RoomsDocument, RoomsEntity } from '../schema/rooms.schema';



@Injectable()
export class RoomsService {
    constructor(
     @InjectModel(RoomsEntity.name)private readonly roomsModel:Model<RoomsDocument>
    ){}
    async createRoom(body:RoomsCreateDto){
        const newRooms=await new this.roomsModel(body)
        return newRooms.save()
    }
    
}