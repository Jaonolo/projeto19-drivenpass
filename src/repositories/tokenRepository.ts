import client from "../database"
import { Token } from "@prisma/client"

export const isBlacklisted = async ({token}: Pick<Token, "token">) => {

    const query = await client.token.findFirst({
        where: {
            token
        }
    })

    console.log(query)
    return query
}