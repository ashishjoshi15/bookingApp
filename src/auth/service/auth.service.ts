/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { DatabaseConnection } from "src/database/database.services";
import { UserDocument, UserEntity } from "src/users/schema/user.schema";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";
import { text } from "stream/consumers";


@Injectable()
export class AuthService {
    constructor(
     @InjectModel(UserEntity.name)private readonly userModel:Model<UserDocument>,
     @DatabaseConnection() private readonly db: Connection,
     private readonly jwtService : JwtService,
     private readonly mailService : MailerService
     
    ){}
   async sendOtp(phone:string,token:string){
    const otp = this.random(4).toString();
       await this.db.collection('user_otp').updateOne(
            {
                phone: phone.toLowerCase(),
                token
            },
            {
                $setOnInsert: { phone: phone.toLowerCase(), token, otp },
            },
            {
                upsert: true,
            }
        );
      const IsEmailinPhone = phone.search("@")
      if(IsEmailinPhone !== -1){
        console.log("sendmail-------------->>>>",phone)
        await this.mailService.sendMail({
            to:phone.toString(),
            from:"joshi123paliwalashish@gmail.com",
            subject:"otp verify",
            text:`your otp is ${otp}` 
        })
      }
        return true     
   }
   async verifyOtp(body){

    const isValidOtp = await this.db.collection('user_otp').findOne({
        token:body.token,
        otp:body.otp,
        phone:body.phone
    })
     if(isValidOtp){
        await this.db.collection('user_otp').deleteOne({
            otp:body.otp,
            token:body.token,
            phone:body.phone
           })

        return true
    }
    return false
   }

   async validateUser(email,Password){
    const user=await this.userModel.findOne({email:email})
    
        if(!user){
            throw new NotFoundException("user not found")
        }
        const isPasswordCorrect = await bcrypt.compare(
            Password,
            user.password
        )
        if(!isPasswordCorrect){
          throw new NotAcceptableException("Wrong password or email!")
        } 

        return user
   }
   

   random(length: number): number {
    const min: number = Number.parseInt(`1`.padEnd(length, '0'));
    const max: number = Number.parseInt(`9`.padEnd(length, '9'));
    return this.randomInRange(min, max);
   }
   randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
   }

    }