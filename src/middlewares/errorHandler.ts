import { ErrorRequestHandler } from "express";

export const ErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log(error);
    if (error.response) {
      return res.sendStatus(error.response.status);
    }
  
    res.sendStatus(500);
}