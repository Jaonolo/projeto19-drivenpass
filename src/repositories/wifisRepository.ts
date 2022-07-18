import client from "../database.js";
import { Wifi } from "@prisma/client";

export type CreateWifiData = Omit<Wifi, "id">
export type WifiId = Pick<Wifi, "id">

export const create = async (wifiData: CreateWifiData) => {

    const query = await client.wifi.create({
        data: wifiData
    })

    return query
}

export const get = async ({ id }: WifiId) => {

    const query = await client.wifi.findFirst({
        where: {
            id
        }
    })

    return query
}

export const getAll = async ({ userId }: Pick<Wifi, "userId">) => {

    const query = await client.wifi.findMany({
        where: {
            userId
        }
    })

    return query
}

export const remove = async ({ id }: WifiId) => {

    const query = await client.wifi.delete({
        where: {
            id
        }
    })

    return query
}