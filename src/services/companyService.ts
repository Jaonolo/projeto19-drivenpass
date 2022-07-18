import * as companyRepository from "../repositories/companyRepository.js"

export const get = async (xApiKey: string) => {

    const company = await companyRepository.findByApiKey(xApiKey);
    
    if(!company) throw "Erro!"

    return company
}