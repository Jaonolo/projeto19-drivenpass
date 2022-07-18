import { Router } from "express";
import * as wifiController from "../controllers/wifisController.js"

import { authValidator } from "../middlewares/authValidator.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import * as createSchemas from "../schemas/createSchemas.js"
import { entityId } from "../schemas/sharedSchemas.js";

const wifiRouter: Router = Router();

wifiRouter.get("/wifis", authValidator, wifiController.getAll)
wifiRouter.get("/wifis/:id", authValidator, wifiController.get)
wifiRouter.post("/wifis/create", authValidator, schemaValidator(createSchemas.createWifi), wifiController.create);
wifiRouter.delete("/wifis/delete", authValidator, schemaValidator(entityId), wifiController.remove);

export default wifiRouter;