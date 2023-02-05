/* eslint-disable prettier/prettier */
import { Body, Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { query } from 'express';
import { Connection, Model, Types } from 'mongoose';
import { DatabaseConnection } from 'src/database/database.services';
import { RoomsCreateDto } from '../dto/create.room.dto';
import { RoomsDocument, RoomsEntity } from '../schema/rooms.schema';



@Injectable()
export class RoomsService {
    constructor(
     @InjectModel(RoomsEntity.name)private readonly roomsModel:Model<RoomsDocument>,
     @DatabaseConnection() private readonly db: Connection
    ){}
    async createRoom(body:RoomsCreateDto){
        const hotel_id =new Types.ObjectId(body.hotel_id)
      
        const newRoom=await new this.roomsModel(body)

         const savedRoom= await newRoom.save()
         console.log("savedroom",savedRoom)

         await this.db.collection('hotels').updateOne(
            {_id:new Types.ObjectId(hotel_id)},
            {$push:{rooms:savedRoom._id}})

        return {message:"room created",savedRoom}
         }

         async getRoomsByHotel(hotelId){
               const getRooms=await this.roomsModel.find({hotel_id:new Types.ObjectId(hotelId)})
               return getRooms
         }

         async updateRoom(body,Id){
            const data = await this.roomsModel.updateOne(
            {_id:new Types.ObjectId(Id)},
            {$set:body})
            return {massage:"room updated successfully"}
         }

         async deleteRoom(roomId,hotelId){
            await this.roomsModel.deleteOne(
                {_id:new Types.ObjectId(roomId)}
                )
                await this.db.collection('hotels').updateOne(
                    {_id:new Types.ObjectId(hotelId)},
                    {$push:{rooms:roomId}})   

               return {message:"room delete succesfully"}
         }
       async getRoom(id){
        const data = await this.roomsModel.findOne(
            {_id:new Types.ObjectId(id)}
            )
       }
       async getAllRooms(page,limit){
        page =  page > 5 ? 5 : page;
        limit = limit > 20 ? 20  : limit;
        const skip:number = (page - 1) * limit;

        const rooms=await this.roomsModel.find().limit(limit).skip(skip)
        return rooms
        
       }
    
}