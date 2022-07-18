import { CreateCredentialData } from "../repositories/credentialRepository"
import cryptr from "../utils/cryptUtils.js"

import * as credentialRepository from "../repositories/credentialRepository.js"

export const create = async (credentialData: CreateCredentialData) => {

    const userCredentials = await credentialRepository.getAll({userId: credentialData.userId})
    const titles = userCredentials.map(e => e.title)
    if(titles.includes(credentialData.title))
        throw "Erro!"

    const encryptedPassword = cryptr.encrypt(credentialData.password)

    return await credentialRepository.create({
        ...credentialData,
        password: encryptedPassword
    })
}

export const get = async (id: number, userId: number) => {

    const credentialEncrypted = await credentialRepository.get({id})
    if(!credentialEncrypted)
        throw "Erro!"
    
    if(credentialEncrypted.userId !== userId)
        throw "Erro!"

    const credential = {
        ...credentialEncrypted,
        password: cryptr.decrypt(credentialEncrypted.password)    
    }

    return credential
}

export const getAll = async (userId: number) => {
    
    const credentialsEncrypted = await credentialRepository.getAll({userId})
    const credentials = credentialsEncrypted.map(e => {
        return {
            ...e,
            password: cryptr.decrypt(e.password)
        }
    })

    return credentials
}

export const remove = async (id: number, userId: number) => {

    const credential = await credentialRepository.get({id})
    if(!credential)
        throw "Erro!"
    
    if(credential.userId !== userId)
        throw "Erro!"

    return await credentialRepository.remove({id})
}