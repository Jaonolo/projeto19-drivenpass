import client from "../database.js"
import { Token } from "@prisma/client"

export const isBlacklisted = async ({token}: Pick<Token, "token">) => {

    const query = await client.token.findFirst({
        where: {
            token
        }
    })
    
    return query
}