import express from "express";
import cors from "cors";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./middlewares/errorHandler.js";
import corsOptions from "./utils/corsOptions.js";
import appRouter from "./router.js";

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/v1", appRouter);

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
