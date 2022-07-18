import { Router } from "express";
import * as cardController from "../controllers/cardController.js"

import { schemaValidator } from "../middlewares/schemaValidator.js";
import * as cardSchemas from "../schemas/cardSchemas.js"

const cardRouter: Router = Router();

cardRouter.post("/card/create", schemaValidator(cardSchemas.create), cardController.create);
cardRouter.put("/card/enable", schemaValidator(cardSchemas.enable), cardController.enable);
cardRouter.get("/card/extract/:id", cardController.visualizeExtract)
cardRouter.put("/card/block", schemaValidator(cardSchemas.toggleBlock), cardController.toggleBlock(true))
cardRouter.put("/card/unblock", schemaValidator(cardSchemas.toggleBlock), cardController.toggleBlock(false))

export default cardRouter;