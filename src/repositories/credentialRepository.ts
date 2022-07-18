import client from "../database";
import { Credential } from "@prisma/client";

export type CreateCredentialData = Omit<Credential, "id">
export type CredentialId = Pick<Credential, "id">

export const create = async (credentialData: CreateCredentialData) => {

    const query = await client.credential.create({
        data: credentialData
    })

    return query
}

export const get = async ({ id }: CredentialId) => {

    const query = await client.credential.findFirst({
        where: {
            id
        }
    })

    return query
}

export const getAll = async ({ userId }: Pick<Credential, "userId">) => {

    const query = await client.credential.findMany({
        where: {
            userId
        }
    })

    return query
}

export const remove = async ({ id }: CredentialId) => {

    const query = await client.credential.delete({
        where: {
            id
        }
    })

    return query
}