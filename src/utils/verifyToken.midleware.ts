/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class verifyUserToken implements NestMiddleware {
    constructor( private readonly jwtService : JwtService){}
  use(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
     
        if (!token) {
          throw new Error();
        }
       const  decoded = this.jwtService.verify(token,{
        secret:process.env.JWT
       })
       
       if(decoded._id.toString() !== req.params.id.toString() || decoded.IsAdmin === true){
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