import client from "../database.js";
import { User } from "@prisma/client";

export const create = async (userData: Omit<User, "id">) => {

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