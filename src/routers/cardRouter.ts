import { Router } from "express";
import * as cardController from "../controllers/cardsController.js"

import { authValidator } from "../middlewares/authValidator.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import * as createSchemas from "../schemas/createSchemas.js"
import { entityId } from "../schemas/sharedSchemas.js";

const cardRouter: Router = Router();

cardRouter.get("/cards", authValidator, cardController.getAll)
cardRouter.get("/cards/:id", authValidator, cardController.get)
cardRouter.post("/cards/create", authValidator, schemaValidator(createSchemas.createCard), cardController.create);
cardRouter.delete("/cards/delete", authValidator, schemaValidator(entityId), cardController.remove);

export default cardRouter;