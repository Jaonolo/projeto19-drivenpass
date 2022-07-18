import { RechargeInsertData } from "../repositories/rechargeRepository.js"
import { PaymentInsertData } from "../repositories/paymentRepository.js"

import cryptr from "../utils/cryptUtils.js"

import * as cardRepository from "../repositories/cardRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"
import * as businessRepository from "../repositories/businessRepository.js"
import * as cardServices from "../services/cardService.js"
import * as dateUtils from "../utils/dateUtils.js"

export const getPayments = async (id: number) => {
    
    const card = await cardRepository.findById(id)
    if(!card) throw "Erro!"

    return await paymentRepository.findByCardId(card.id)
}

export const getRecharges = async (id: number) => {
    
    const card = await cardRepository.findById(id)
    if(!card) throw "Erro!"

    return await rechargeRepository.findByCardId(card.id)
}

export const recharge = async (id: number, amount: number) => {

    const card = await cardRepository.findById(id)

    // ========
    if(!card) throw "Erro!"
    if(!card.password) throw "Erro!"
    // separate this two?

    if(dateUtils.isOutdated(card.expirationDate)) throw "Erro!"
    // ========

    const rechargeData: RechargeInsertData = {
        cardId: id,
        amount
    }

    return await rechargeRepository.insert(rechargeData)
}

export const buy = async (id: number, password: string, businessId: number, amount: number) => {

    const card = await cardRepository.findById(id)
    const business = await businessRepository.findById(businessId)

    // ========
    if(!card) throw "Erro!"
    if(!card.password) throw "Erro!"
    if(cryptr.decrypt(card.password) !== password) throw "Erro!"
    // separate this three errors? (espec. last two)

    if(dateUtils.isOutdated(card.expirationDate)) throw "Erro!"
    if(card.isBlocked === true) throw "Erro!"

    if(!business) throw "Erro!"
    if(business.type !== card.type) throw "Erro!"

    const { balance } = await cardServices.visualizeExtract(card.id)
    if(balance < amount) throw "Erro!"
    // ========

    const paymentData: PaymentInsertData = {
        cardId: card.id,
        amount,
        businessId
    }

    return await paymentRepository.insert(paymentData)
}