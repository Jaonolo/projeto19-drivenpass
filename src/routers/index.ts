import { Router } from "express"

import cardRouter from "./cardRouter.js"
import transactionRouter from "./transactionRouter.js"

const Routers: Router[] = [
    cardRouter,
    transactionRouter
]

export default Routers