import { Request, Response } from "express"

import * as cardsService from "../services/cardsService.js"
import { CreateCardData, CardId } from "../repositories/cardsRepository.js"
import { parseDate } from "../utils/dateUtils.js"

export const create = async (req: Request, res: Response) => {

    const {
        title,
        number,
        name,
        password,
        cvv,
        expirationDate,
        isVirtual,
        type
    } : CreateCardData = req.body
    
    parseDate(expirationDate)

    const { userId } = res.locals
    const cardData = {
        title,
        number,
        name,
        password,
        cvv,
        expirationDate,
        isVirtual,
        type,
        userId
    }
    
    await cardsService.create(cardData)

    return res.sendStatus(201)
}

export const get = async (req: Request<CardId>, res: Response) => {

    const { id } : CardId = req.params
    
    const { userId } = res.locals
    
    const card = await cardsService.get(id*1, userId)

    return res.send(card)
}

export const getAll = async (req: Request, res: Response) => {

    const { userId } = res.locals
    
    const cards = await cardsService.getAll(userId)

    return res.send(cards)
}

export const remove = async (req: Request, res: Response) => {

    const { id } : CardId = req.body
    
    const { userId } = res.locals
    
    await cardsService.remove(id, userId)
    
    return res.sendStatus(204)
}