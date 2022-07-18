import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv"
import "express-async-errors";

import Routers from "./routers/index.js";
import { ErrorHandler } from "./middlewares/errorHandler.js";

dotenv.config()

const app = express();

app.use(json(), cors(), ErrorHandler, ...Routers);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Running on " + PORT);
});