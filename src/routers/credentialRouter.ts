import { Router } from "express";
import * as credentialController from "../controllers/credentialsController.js"

import { authValidator } from "../middlewares/authValidator.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import * as createSchemas from "../schemas/createSchemas.js"
import { entityId } from "../schemas/sharedSchemas.js";

const credentialRouter: Router = Router();

credentialRouter.get("/credentials", authValidator, credentialController.getAll)
credentialRouter.get("/credentials/:id", authValidator, credentialController.get)
credentialRouter.post("/credentials/create", authValidator, schemaValidator(createSchemas.createCredential), credentialController.create);
credentialRouter.delete("/credentials/delete", authValidator, schemaValidator(entityId), credentialController.remove);

export default credentialRouter;