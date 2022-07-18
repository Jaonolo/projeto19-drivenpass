import { Request, Response, NextFunction, json } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken"

import * as tokenRepository from "../repositories/tokenRepository.js"
import * as userRepository from "../repositories/userRepository.js"

export const authValidator = (schema: { validate: Function }) => async (req: Request, res: Response, next: NextFunction) => { 

    const token = req.headers?.authorization
    if(!token)
        throw "Erro!"

    const isBlacklisted = await tokenRepository.isBlacklisted({token})
    if(isBlacklisted)
        throw "Erro!"

    const secret: Secret = process.env.JWT_SECRET || 'secret'
    const payload = jwt.verify(token, secret) as any
    
    const user = await userRepository.get({email: payload.email})
    if(!user)
        throw "Erro!"

    const { id } = user
    res.locals = { userId: id }

    next();
}