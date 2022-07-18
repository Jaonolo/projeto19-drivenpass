import { CreateWifiData } from "../repositories/wifisRepository.js"
import cryptr from "../utils/cryptUtils.js"

import * as wifiRepository from "../repositories/wifisRepository.js"

export const create = async (wifiData: CreateWifiData) => {

    const encryptedPassword = cryptr.encrypt(wifiData.password)

    return await wifiRepository.create({
        ...wifiData,
        password: encryptedPassword
    })
}

export const get = async (id: number, userId: number) => {

    const wifiEncrypted = await wifiRepository.get({id})
    if(!wifiEncrypted)
        throw "Erro!"
    
    if(wifiEncrypted.userId !== userId)
        throw "Erro!"

    const wifi = {
        ...wifiEncrypted,
        password: cryptr.decrypt(wifiEncrypted.password)    
    }

    return wifi
}

export const getAll = async (userId: number) => {
    
    const wifisEncrypted = await wifiRepository.getAll({userId})
    const wifis = wifisEncrypted.map(e => {
        return {
            ...e,
            password: cryptr.decrypt(e.password)
        }
    })

    return wifis
}

export const remove = async (id: number, userId: number) => {

    const wifi = await wifiRepository.get({id})
    if(!wifi)
        throw "Erro!"
    
    if(wifi.userId !== userId)
        throw "Erro!"

    return await wifiRepository.remove({id})
}