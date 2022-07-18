import { Router } from "express";
import * as authController from "../controllers/authController.js"

import { schemaValidator } from "../middlewares/schemaValidator.js";
import * as cardSchemas from "../schemas/cardSchemas.js"

const authRouter: Router = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

export default authRouter;