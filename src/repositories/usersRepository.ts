import client from "../database.js";
import { User } from "@prisma/client";

export type CreateUserData = Omit<User, "id" | "createdAt">

export const create = async (userData: CreateUserData) => {

    const query = await client.user.create({
        data: userData
    })

    return query 
}

export const get = async ({email}: Pick<User, "email">) => {

    const query = await client.user.findFirst({
        where: {
            email
        }
    })

    return query
}