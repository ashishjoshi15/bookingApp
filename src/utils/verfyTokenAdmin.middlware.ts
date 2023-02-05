/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Connection, Model, Types } from 'mongoose';
import { DatabaseConnection } from 'src/database/database.services';
import { UserDocument, UserEntity } from 'src/users/schema/user.schema';


@Injectable()
export class verifyAdminToken implements NestMiddleware {
    constructor( private readonly jwtService : JwtService,
        @InjectModel(UserEntity.name)private readonly userModel:Model<UserDocument>    ){}
 async use(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
     
        if (!token) {
          throw new Error();
        }
       const  decoded = await this.jwtService.verify(token,{
        secret:process.env.JWT
       })
       const user = await this.userModel.findOne({
        _id:new Types.ObjectId(decoded._id)
       })
       console.log("user-------------->>>>",user,)
       if(user.IsAdmin !== true){
        throw new UnauthorizedException({
          message:"Please authenticate"
        })
        }
        next();
      } catch (err) {
        res.status(401).send('Please authenticate');
      }
     };
        
  }