import { Router } from "express";
import * as credentialController from "../controllers/credentialController.js"

import { schemaValidator } from "../middlewares/schemaValidator.js";
import * as cardSchemas from "../schemas/cardSchemas.js"

const credentialRouter: Router = Router();

credentialRouter.get("/credentials", credentialController.getAll)
credentialRouter.get("/credentials/:id", credentialController.get)
credentialRouter.post("/credentials/create", credentialController.create);
credentialRouter.delete("/credentials/delete", credentialController.remove);

export default credentialRouter;