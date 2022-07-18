import joi from "joi";

export const entityId = joi.object({
    id: joi.number().required(),
})