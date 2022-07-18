import { CreateCardData } from "../repositories/cardsRepository.js"
import cryptr from "../utils/cryptUtils.js"

import * as cardsRepository from "../repositories/cardsRepository.js"

export const create = async (cardData: CreateCardData) => {

    const userCards = await cardsRepository.getAll({userId: cardData.userId})
    const titles = userCards.map(e => e.title)
    if(titles.includes(cardData.title))
        throw "Erro!"

    const encryptedPassword = cryptr.encrypt(cardData.password)
    const encryptedCVV = cryptr.encrypt(cardData.cvv)

    return await cardsRepository.create({
        ...cardData,
        password: encryptedPassword,
        cvv: encryptedCVV
    })
}

export const get = async (id: number, userId: number) => {

    const cardEncrypted = await cardsRepository.get({id})
    if(!cardEncrypted)
        throw "Erro!"
    
    if(cardEncrypted.userId !== userId)
        throw "Erro!"

    const card = {
        ...cardEncrypted,
        password: cryptr.decrypt(cardEncrypted.password),
        cvv: cryptr.decrypt(cardEncrypted.cvv) 
    }

    return card
}

export const getAll = async (userId: number) => {
    
    const cardsEncrypted = await cardsRepository.getAll({userId})
    const cards = cardsEncrypted.map(e => {
        return {
            ...e,
            password: cryptr.decrypt(e.password),
            cvv: cryptr.decrypt(e.cvv)
        }
    })

    return cards
}

export const remove = async (id: number, userId: number) => {

    const card = await cardsRepository.get({id})
    if(!card)
        throw "Erro!"
    
    if(card.userId !== userId)
        throw "Erro!"

    return await cardsRepository.remove({id})
}