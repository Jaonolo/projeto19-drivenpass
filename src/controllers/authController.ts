import { Request, Response } from "express"
import { User } from "@prisma/client"

import * as userService from "../services/usersService.js"

export const register = async (req: Request, res: Response) => {

    const { email, password } : Omit<User, "id"> = req.body

    await userService.create({email, password});

    return res.sendStatus(201)
}

export const login = async (req: Request, res: Response) => {

    const { email, password } : Omit<User, "id"> = req.body

    const session = await userService.login({email, password})

    return res.send(session)
}
