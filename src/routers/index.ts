import { Router } from "express"

import authRouter from "./authRouter.js"

import credentialRouter from "./credentialRouter.js"
import secureNoteRouter from "./secureNoteRouter.js"
import cardRouter from "./cardRouter.js"
import wifiRouter from "./wifiRouter.js"

const Routers: Router[] = [
    authRouter,
    credentialRouter,
    secureNoteRouter,
    cardRouter,
    wifiRouter
]

export default Routers