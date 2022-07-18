import { Router } from "express"

import authRouter from "./authRouter.js"
import cardRouter from "./cardRouter.js"

const Routers: Router[] = [
    //cardRouter,
    //transactionRouter
    authRouter
]

export default Routers