import { CreateSNoteData } from "../repositories/secureNotesRepository.js"
import cryptr from "../utils/cryptUtils.js"

import * as secureNoteRepository from "../repositories/secureNotesRepository.js"

export const create = async (secureNoteData: CreateSNoteData) => {

    const userSecureNotes = await secureNoteRepository.getAll({userId: secureNoteData.userId})
    const titles = userSecureNotes.map(e => e.title)
    if(titles.includes(secureNoteData.title))
        throw "Erro!"

    const encryptedNote = cryptr.encrypt(secureNoteData.body)

    return await secureNoteRepository.create({
        ...secureNoteData,
        body: encryptedNote
    })
}

export const get = async (id: number, userId: number) => {

    const secureNoteEncrypted = await secureNoteRepository.get({id})
    if(!secureNoteEncrypted)
        throw "Erro!"
    
    if(secureNoteEncrypted.userId !== userId)
        throw "Erro!"

    const secureNote = {
        ...secureNoteEncrypted,
        body: cryptr.decrypt(secureNoteEncrypted.body)    
    }

    return secureNote
}

export const getAll = async (userId: number) => {
    
    const secureNotesEncrypted = await secureNoteRepository.getAll({userId})
    const secureNotes = secureNotesEncrypted.map(e => {
        return {
            ...e,
            body: cryptr.decrypt(e.body)
        }
    })

    return secureNotes
}

export const remove = async (id: number, userId: number) => {

    const secureNote = await secureNoteRepository.get({id})
    if(!secureNote)
        throw "Erro!"
    
    if(secureNote.userId !== userId)
        throw "Erro!"

    return await secureNoteRepository.remove({id})
}