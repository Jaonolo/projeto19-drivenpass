import { Router } from "express";
import * as secureNoteController from "../controllers/secureNoteController.js"

import { authValidator } from "../middlewares/authValidator.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import * as createSchemas from "../schemas/createSchemas.js"
import { entityId } from "../schemas/sharedSchemas.js";

const secureNoteRouter: Router = Router();

secureNoteRouter.get("/snotes", authValidator, secureNoteController.getAll)
secureNoteRouter.get("/snotes/:id", authValidator, secureNoteController.get)
secureNoteRouter.post("/snotes/create", authValidator, schemaValidator(createSchemas.createSecureNote), secureNoteController.create);
secureNoteRouter.delete("/snotes/delete", authValidator, schemaValidator(entityId), secureNoteController.remove);

export default secureNoteRouter;