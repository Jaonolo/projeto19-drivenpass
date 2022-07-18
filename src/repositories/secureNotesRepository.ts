import client from "../database.js";
import { SecureNote } from "@prisma/client";

export type CreateSNoteData = Omit<SecureNote, "id">
export type SNoteId = Pick<SecureNote, "id">

export const create = async (secureNoteData: CreateSNoteData) => {

    const query = await client.secureNote.create({
        data: secureNoteData
    })

    return query
}

export const get = async ({ id }: SNoteId) => {

    const query = await client.secureNote.findFirst({
        where: {
            id
        }
    })

    return query
}

export const getAll = async ({ userId }: Pick<SecureNote, "userId">) => {

    const query = await client.secureNote.findMany({
        where: {
            userId
        }
    })

    return query
}

export const remove = async ({ id }: SNoteId) => {

    const query = await client.secureNote.delete({
        where: {
            id
        }
    })

    return query
}