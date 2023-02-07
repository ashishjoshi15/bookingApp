/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Request, Get, NotAcceptableException, NotFoundException, Param, Patch, Post, Query, UseGuards, Res, UnauthorizedException } from "@nestjs/common";
import { PaginationParams } from "src/paginationParams.dto";
import { UserService } from "src/users/service/user.service";
import * as bcrypt from 'bcrypt';
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, UserEntity } from "src/users/schema/user.schema";
import { Model } from "mongoose";
import { UserDTO } from "src/users/dto/user.create.dto";
import { LoginWithPassword } from "../dto/login.dto";
import { LoginWithOtp } from "../dto/loginWithotp.dto";
import { AuthService } from "../service/auth.service";
import { ForgetPasswordDto } from "../dto/forgetpassword.dto";


import { JwtService } from "@nestjs/jwt";
import { VerifyOtpDto } from "../dto/verify_otp.dto";

export let jwtService: JwtService

@Controller('/auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        @InjectModel(UserEntity.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService
    ) { }
    @Post('/register')
    async registerUser(@Body() userDto: UserDTO) {
        const IsEmailPhoneExists = await this.userModel.findOne({ $or: [{ email: userDto.email }, { phone: userDto.phone }] })
        if (IsEmailPhoneExists) {
            throw new NotAcceptableException({
                message: "phone or email must be uniqe"
            })
        }
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(userDto.password, saltOrRounds);
        console.log("hash", hash)
        const newUser = new this.userModel({
            ...userDto, password: hash
        })
        console.log(newUser)
        return await newUser.save()
    }

    @Post('/login')
    async loginUser(
        @Body() body: LoginWithPassword) {
        const user = await this.authService.validateUser(body.email, body.password)
        if (!user) {
            throw new NotFoundException()
        }

        const token = this.jwtService.sign({ _id: user._id, email: user.email.toString }, {
            secret: process.env.JWT,
            expiresIn: "2d",
            notBefore: "0" || 0,
        });

        return { message: "Logged in successfully", user, token: token };

    }

    @Post('get_otp')
    async getOtp(
        @Body() body: LoginWithOtp,
        @Query() query) {
        const user = await this.userModel.findOne({ phone: body.phone })

        if (user && query.key === "forgetPassword") {
            throw new NotFoundException({
                message: "user not found"
            })
        }
        const otp = await this.authService.sendOtp(body.phone, body.token)
        if (otp !== true) {
            return 'something want wrong'
        }
        return 'otp send'
    }

    @Post('/verifyOtp')
    async VerifyOtp(@Body() body: VerifyOtpDto) {
        const validOtp = await this.authService.verifyOtp(body)
        if (validOtp !== true) {
            throw new UnauthorizedException({
                message: "worng Otp"
            })
        }
        const user = await this.userModel.findOne({
            $or: [
            { email: body.phone },
            { phone: body.phone }
            ]
        })
        if (user) {
            const token = this.jwtService.sign({ _id: user._id, email: user.email.toString }, {
                secret: process.env.JWT,
                expiresIn: "2d",
                notBefore: "0" || 0,
            });

            return { message: "Logged in successfully", user, token: token };
            return
        }
    }

    @Post('forget-password')
    async forgetPassword(
        @Body() body: ForgetPasswordDto) {
        const user = await this.userModel.findOne({ phone: body.phone })
        if (!user) {
            throw new NotFoundException({
                message: 'user not found!!'
            })
        }
        const validOtp = await this.authService.verifyOtp(body)
        if (validOtp === true) {
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(body.password, saltOrRounds);
            await this.userModel.updateOne({ phone: body.phone }, { password: hash })
            return { message: "password updated" }
        }
    }
}