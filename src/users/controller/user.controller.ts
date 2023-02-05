/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { PaginationParams } from "src/paginationParams.dto";
import { UserDTO } from "../dto/user.create.dto";
import { UserService } from "../service/user.service";

@Controller('/user')
export class UserController{
    constructor(
        private readonly userService:UserService
    ){}
    @Get('getAll')
    async getAllUser(@Query(){ page, limit }: PaginationParams){
        
        const data = await this.userService.getUsersList(page,limit)
        return data
    }
    @Get('/:id')
    async getByUserId(@Param('id') id){
        const data = await this.userService.getUsersById(id)
        return data
    }
    @Patch('/update/:id')
    async updateById(@Param('id') id,@Body() userDto:UserDTO){
        const data = await this.userService.updateUserById(id,userDto)
        return data
    }
    @Delete('delete/:id')
    async deleteUserbyId(@Param('id') id,){
        const data= await this.userService.deleteUserById(id)
        return data
    }

}