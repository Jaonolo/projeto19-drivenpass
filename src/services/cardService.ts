import { TransactionTypes, CardInsertData, CardUpdateData } from "../repositories/cardRepository.js";
import { Employee } from "../repositories/employeeRepository.js";

import { faker } from "@faker-js/faker"
import cryptr from "../utils/cryptUtils.js"

import * as cardRepository from "../repositories/cardRepository.js"
import * as transactionService from "../services/transactionService.js"
import * as dateUtils from "../utils/dateUtils.js"

export const create = async (employee: Employee, type: TransactionTypes) => {
    
    const cardIfAlreadyExists = await cardRepository.findByTypeAndEmployeeId(type, employee.id)
    if(cardIfAlreadyExists) throw "Erro!"

    const cvv = faker.finance.creditCardCVV()

    const cardData: CardInsertData = {
        number: faker.finance.creditCardNumber(),
        employeeId: employee.id,
        cardholderName: generateCardName(employee.fullName),
        securityCode: cryptr.encrypt(cvv),
        expirationDate: dateUtils.generateNewCardDate(),
        isVirtual: false,
        isBlocked: false,
        type
    }

    await cardRepository.insert(cardData)
    const createdCard = await cardRepository.findByTypeAndEmployeeId(type, employee.id)

    return {
        cardholderName: createdCard.cardholderName,
        number: createdCard.number,
        expirationDate: createdCard.expirationDate,
        cvv
    }
}

export const generateCardName = (name: string) => {
    
    const names = name.split(' ')
    
    const firstName = names.shift()?.toUpperCase()
    const lastName = names.pop()?.toUpperCase()
    
    const middleNames = names.map(e => e.length >= 3 ? e[0].toUpperCase() : '' )
    
    return [firstName, ...middleNames, lastName].filter(e => e).join(' ')
}

export const enable = async (id: number, cvv: string, password: string) => {

    const card = await cardRepository.findById(id)

    // ========
    if(!card) throw "Erro!"
    if(cryptr.decrypt(card.securityCode) !== cvv) throw "Erro!"
    // separate this two errors?

    if(dateUtils.isOutdated(card.expirationDate)) throw "Erro!"
    if(card.password) throw "Erro!"
    if(password.length !== 4) throw "Erro!"
    // ========

    const cardData: CardUpdateData = {
        password: cryptr.encrypt(password)
    }

    return await cardRepository.update(card.id, cardData)
}

export const toggleBlock = (block: boolean) => async (id: number, password: string) => {

    const card = await cardRepository.findById(id)
    
    // ========
    if(!card) throw "Erro!"
    if(!card.password) throw "Erro!"
    if(cryptr.decrypt(card.password) !== password) throw "Erro!"
    // separate this three errors? (espec. last two)

    if(dateUtils.isOutdated(card.expirationDate)) throw "Erro!"
    if(card.isBlocked === block) throw "Erro!"
    // ========

    const cardData: CardUpdateData = {
        isBlocked: block
    }

    return await cardRepository.update(card.id, cardData)
}

export const visualizeExtract = async (id: number) => {

    const card = await cardRepository.findById(id)
    if(!card) throw "Erro!"

    const transactions = await transactionService.getPayments(card.id)
    const recharges = await transactionService.getRecharges(card.id)

    const reduce = (arr: any[]) => arr.reduce((acc, elem) => acc + elem?.amount, 0)

    const balance = reduce(recharges) - reduce(transactions)

    console.log(transactions, recharges, balance)

    return {
        balance,
        transactions,
        recharges
    }
}

export const get = async (id: number) => {

    const card = await cardRepository.findById(id);
    
    if(!card) throw "Erro!"

    return card
}