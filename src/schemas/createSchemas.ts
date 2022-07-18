import joi from "joi"

const cardTypes = ["credit", "debit", "both"]

export const createUser = joi.object(
    {
        email: joi.string().email().required(),
        password: joi.string().min(10).required()
    }
)

export const createCredential = joi.object(
    {
        title: joi.string().required(),
        url: joi.string().uri().required(),
        username: joi.string().required(),
        password: joi.string().required()
    } 
)

/* card number and cvv length were not restricted because this may vary by country and card brands */
export const createCard = joi.object(
    {
        title: joi.string().required(),
        number: joi.string().regex(/^\d+$/).required(),
        name: joi.string().required(),
        password: joi.string().required(),
        cvv: joi.string().regex(/^\d+$/).required(),
        expirationDate: joi.string().required(),
        isVirtual: joi.boolean().required(),
        type: joi.string().valid(...cardTypes).required()
    }
)

export const createSecureNote = joi.object(
    {
        title: joi.string().max(50).required(),
        body: joi.string().max(1000).required()
    }
)

export const createWifi = joi.object(
    {
        title: joi.string().required(),
        name: joi.string().required(),
        password: joi.string().required()
    }
)