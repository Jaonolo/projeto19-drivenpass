import { Request, Response } from "express"

import * as secureNoteService from "../services/secureNotesService.js"
import { CreateSNoteData, SNoteId } from "../repositories/secureNotesRepository.js"

export const create = async (req: Request, res: Response) => {

    const { title, body } : CreateSNoteData = req.body
    
    const { userId } = res.locals
    const secureNoteData = { title, body, userId }
    
    await secureNoteService.create(secureNoteData)

    return res.sendStatus(201)
}

export const get = async (req: Request<SNoteId>, res: Response) => {

    const { id } : SNoteId = req.params
    
    const { userId } = res.locals
    
    const secureNote = await secureNoteService.get(id*1, userId)

    return res.send(secureNote)
}

export const getAll = async (req: Request, res: Response) => {

    const { userId } = res.locals
    
    const secureNotes = await secureNoteService.getAll(userId)

    return res.send(secureNotes)
}

export const remove = async (req: Request, res: Response) => {

    const { id } : SNoteId = req.body
    
    const { userId } = res.locals
    
    await secureNoteService.remove(id, userId)
    
    return res.sendStatus(204)
}