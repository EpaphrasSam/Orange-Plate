import * as dotenv from "dotenv";
   import express from "express";
   import cors from "cors";
   import index from "./routes";

   dotenv.config();
   const app = express();

   app.use(cors());
   app.use(express.json());

   app.use('/', index);

   export default app;
  