import express from "express";
import morgan from "morgan";
import dotenv from "dotenv"
import { routes } from "./routes";
import { database } from "./database";

database

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", routes);

// start server
app.listen(process.env.PORT, () =>
  console.log(`🆙 Server running on port ${process.env.PORT}`)
);
