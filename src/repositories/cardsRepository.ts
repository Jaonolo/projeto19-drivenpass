import client from "../database.js";
import { Card } from "@prisma/client";

export type CreateCardData = Omit<Card, "id">
export type CardId = Pick<Card, "id">

export const create = async (cardData: CreateCardData) => {

    const query = await client.card.create({
        data: cardData
    })

    return query
}

export const get = async ({ id }: CardId) => {

    const query = await client.card.findFirst({
        where: {
            id
        }
    })

    return query
}

export const getAll = async ({ userId }: Pick<Card, "userId">) => {

    const query = await client.card.findMany({
        where: {
            userId
        }
    })

    return query
}

export const remove = async ({ id }: CardId) => {

    const query = await client.card.delete({
        where: {
            id
        }
    })

    return query
}