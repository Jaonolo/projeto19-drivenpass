import { Router } from "express";
import * as authController from "../controllers/authController.js"

import { schemaValidator } from "../middlewares/schemaValidator.js";
import * as createSchemas from "../schemas/createSchemas.js"

const authRouter: Router = Router();

authRouter.post("/register", schemaValidator(createSchemas.createUser), authController.register);
authRouter.post("/login", schemaValidator(createSchemas.createUser), authController.login);

export default authRouter;