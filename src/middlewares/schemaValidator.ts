import { Request, Response, NextFunction } from "express";

export const schemaValidator = (schema: { validate: Function }) => (req: Request, res: Response, next: NextFunction) => { 

    const {error} = schema.validate(req.body, {abortEarly: false});
    
    if (error) throw "Erro!";
    
    next();
}