import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import index from "./routes";
import authRoutes from "./routes/auth";
import resturantRoutes from "./routes/resturant";
import adminRoutes from "./routes/admin";
import userRoutes from "./routes/user";
import morgan from "morgan";

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/", index);
app.use("/authentication", authRoutes);
app.use("/restaurant", resturantRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ error: err });
});

export default app;
