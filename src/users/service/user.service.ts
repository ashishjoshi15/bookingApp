/* eslint-disable prettier/prettier */
import { Body, Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from '../dto/user.create.dto';
import { UserDocument, UserEntity } from '../schema/user.schema';


@Injectable()
export class UserService {
    constructor(
     @InjectModel(UserEntity.name)private readonly userModel:Model<UserDocument>
    ){}
    async createUser(@Body() userDto:UserDTO){
      


        const newUser=await new this.userModel(userDto)
        return newUser.save()

    }
    async getUsersList(page,limit){
        limit=10 
        page=1
        page =
            page > 5
                ? 5 : page;
                limit =
                limit > 20
                ? 20
                : limit;
        const skip:number = (page - 1) * limit;

        const users=await this.userModel.find().limit(limit).skip(skip)
        return users
    }
    async getUsersById(id){
        const hotel=await this.userModel.findById(id)
        return hotel
    }
    async deleteUserById(id){
        const deleteuser=await this.userModel.findByIdAndDelete(id)
        if(!deleteuser){
            return {message:'!!!user not exists'}
        }
        return {message:'delete user successfully'}
    }
    async updateUserById(id , userDto : UserDTO ){
        const updateuser = await this.userModel.findByIdAndUpdate(id,userDto,{new:true})
        return {updateuser,message:"user update succesfully"}
    }
    async findOne(email) {
        return this.userModel.findOne(email);
    }
    async getUser(query: object ) {
        return this.userModel.findOne(query);
    }
}