import { Request, Response } from "express"

import * as wifiService from "../services/wifisService.js"
import { CreateWifiData, WifiId } from "../repositories/wifisRepository.js"

export const create = async (req: Request, res: Response) => {

    const { title, name, password } : CreateWifiData = req.body
    
    const { userId } = res.locals
    const wifiData = { title, name, password, userId }
    
    await wifiService.create(wifiData)

    return res.sendStatus(201)
}

export const get = async (req: Request<WifiId>, res: Response) => {

    const { id } : WifiId = req.params
    
    const { userId } = res.locals
    
    const wifi = await wifiService.get(id*1, userId)

    return res.send(wifi)
}

export const getAll = async (req: Request, res: Response) => {

    const { userId } = res.locals
    
    const wifis = await wifiService.getAll(userId)

    return res.send(wifis)
}

export const remove = async (req: Request, res: Response) => {

    const { id } : WifiId = req.body
    
    const { userId } = res.locals
    
    await wifiService.remove(id, userId)
    
    return res.sendStatus(204)
}