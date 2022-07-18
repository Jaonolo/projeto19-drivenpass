import { Request, Response } from "express"
import { TransactionTypes } from "../repositories/cardRepository.js"

import * as companyService from "../services/companyService.js"
import * as employeeService from "../services/employeeService.js"
import * as cardService from "../services/cardService.js"

export const create = async (req: Request, res: Response) => {

    if(typeof(req.headers['x-api-key']) !== 'string') throw "Erro!"

    const xApiKey: string = req.headers['x-api-key']
    const { id, type } : { id: number, type: TransactionTypes } = req.body

    const company = await companyService.get(xApiKey);
    const employee = await employeeService.get(id, company.id);

    const createdCard = await cardService.create(employee, type);

    return res.status(201).send(createdCard)
}

export const enable = async (req: Request, res: Response) => {

    const { id, cvv, password } : { id: number, cvv: string, password: string } = req.body

    await cardService.enable(id, cvv, password)

    return res.sendStatus(200)
}

export const visualizeExtract = async (req: Request<{ id: number }>, res: Response) => {

    const { id } : { id: number } = req.params

    return res.send(await cardService.visualizeExtract(id))
}

export const toggleBlock = (block: boolean) => async (req: Request, res: Response) => {
    
    const { id, password } : { id: number, password: string } = req.body

    await (cardService.toggleBlock(block))(id, password)

    return res.sendStatus(200)
}