import { User } from "@prisma/client";

import bcrypt from "bcrypt"

import * as userRepository from "../repositories/userRepository.js"

export const create = async ({email, password}: Omit<User, "id">) => {

    if(password.length < 10)
        throw "Erro!"

    const userIfExists = await userRepository.get({email})
    if(userIfExists)
        throw "Erro!"

    const encryptedPassword = await bcrypt.hash(password, 10)

    return await userRepository.create({email, password: encryptedPassword})
}

export const login = async ({email, password}: Omit<User, "id">) => {

    const user = await userRepository.get({email})
    if(!user)
        throw "Erro!"

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid)
        throw "Erro!"

    const token = 1

    return `${token}`
}