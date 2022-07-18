import { CreateUserData } from "../repositories/usersRepository.js"
import jwt, { Secret } from "jsonwebtoken"

import bcrypt from "bcrypt"

import * as userRepository from "../repositories/usersRepository.js"

export const create = async ({email, password}: CreateUserData) => {

    if(password.length < 10)
        throw "Erro!"

    const userIfExists = await userRepository.get({email})
    if(userIfExists)
        throw "Erro!"

    const encryptedPassword = await bcrypt.hash(password, 10)

    return await userRepository.create({email, password: encryptedPassword})
}

export const login = async ({email, password}: CreateUserData) => {

    const user = await userRepository.get({email})
    if(!user)
        throw "Erro!"

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid)
        throw "Erro!"

    const secret: Secret = process.env.JWT_SECRET || 'secret'
    const token = jwt.sign({email}, secret)

    return token
}