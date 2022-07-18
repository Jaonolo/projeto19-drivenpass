import joi from "joi"

const transactionTypes = ["groceries", "restaurant", "transport", "education", "health"]

export const toggleBlock = joi.object(
    {
        id: joi.number().required(),
        password: joi.string().required(),
    }
)

export const enable = joi.object(
    {
        id: joi.number().required(),
        cvv: joi.string().required(),
        password: joi.string().required()
    }
)

export const create = joi.object(
    {
        id: joi.number().required(),
        type: joi.string().valid(...transactionTypes).required()
    }
)

export const recharge = joi.object(
    {
        id: joi.number().required(),
        amount: joi.number().required()
    }
)

export const buy = joi.object(
    {
        id: joi.number().required(),
        password: joi.string().required(),
        businessId: joi.number().required(),
        amount: joi.number().required()
    }
)