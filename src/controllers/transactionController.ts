import { Request, Response } from "express"

import * as companyService from "../services/companyService.js"
import * as employeeService from "../services/employeeService.js"
import * as cardService from "../services/cardService.js"
import * as transactionService from "../services/transactionService.js"

export const recharge = async (req: Request, res: Response) => {
    
    if(typeof(req.headers['x-api-key']) !== 'string') throw "Erro!"

    const xApiKey: string = req.headers['x-api-key']
    const { id, amount } : { id: number, amount: number } = req.body

    const company = await companyService.get(xApiKey);
    const card = await cardService.get(id);
    await employeeService.get(card.employeeId, company.id);

    await transactionService.recharge(card.id, amount);

    return res.sendStatus(200)
}

export const buy = async (req: Request, res: Response) => {
    
    const { id, password, businessId, amount } : { id: number, password: string, businessId: number, amount: number } = req.body

    await transactionService.buy(id, password, businessId, amount)

    return res.sendStatus(201)
}