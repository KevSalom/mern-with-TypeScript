import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.route";
import taskRoutes from "./routes/task.route";
import cookieParser from "cookie-parser";


const app = express();

app.disable('x-powered-by');
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoutes)
app.use("/api", taskRoutes)

export default app;