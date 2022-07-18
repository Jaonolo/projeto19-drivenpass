import { Request, Response } from "express"

import * as credentialService from "../services/credentialService.js"
import { CreateCredentialData, CredentialId } from "../repositories/credentialRepository.js"

export const create = async (req: Request, res: Response) => {

    const { title, url, username, password } : CreateCredentialData = req.body
    
    const { userId } = res.locals
    const credentialData = { title, url, username, password, userId }
    
    await credentialService.create(credentialData)

    return res.sendStatus(201)
}

export const get = async (req: Request<CredentialId>, res: Response) => {

    const { id } : CredentialId = req.params
    
    const { userId } = res.locals
    
    const credential = await credentialService.get(id, userId)

    return res.send(credential)
}

export const getAll = async (req: Request, res: Response) => {

    const { userId } = res.locals
    
    const credentials = await credentialService.getAll(userId)

    return res.send(credentials)
}

export const remove = async (req: Request, res: Response) => {

    const { id } : CredentialId = req.body
    
    const { userId } = res.locals
    
    await credentialService.remove(id, userId)
    
    return res.sendStatus(204)
}