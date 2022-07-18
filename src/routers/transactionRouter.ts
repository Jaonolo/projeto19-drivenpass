import { Router } from "express";
import * as transactionController from "../controllers/transactionController.js"

import { schemaValidator } from "../middlewares/schemaValidator.js";
import * as cardSchemas from "../schemas/cardSchemas.js"

const transactionRouter: Router = Router();

transactionRouter.post("/recharge", schemaValidator(cardSchemas.recharge), transactionController.recharge);
transactionRouter.post("/buy", schemaValidator(cardSchemas.buy), transactionController.buy);

export default transactionRouter;