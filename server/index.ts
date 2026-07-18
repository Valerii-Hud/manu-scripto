import express, { urlencoded } from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import reportRoutes from "./routes/report.routes";
import notificatonRoutes from "./routes/notification.routers.ts";

import { ENV_VARS } from "./lib/env/envVars.lib";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToMongoDB from "./lib/db/connectToMongoDB.lib";
import protectRoute from "./middlewares/protectRoute.middleware";
import { v2 as cloudinary } from "cloudinary";

const app = express();
const { MONGO_URI } = ENV_VARS;

cloudinary.config({
  cloud_name: ENV_VARS.CLOUDINARY_CLOUD_NAME,
  api_secret: ENV_VARS.CLOUDINARY_API_SECRET,
  api_key: ENV_VARS.CLOUDINARY_API_KEY,
});

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", protectRoute, userRoutes);
app.use("/api/v1/posts", protectRoute, postRoutes);
app.use("/api/v1/notifications", protectRoute, notificatonRoutes);
app.use("/api/v1/reports", protectRoute, reportRoutes);

app.listen(ENV_VARS.PORT, () => {
  connectToMongoDB(MONGO_URI);
  console.log(
    `Server running at: ${ENV_VARS.PROTOCOL}://${ENV_VARS.DOMAIN}:${ENV_VARS.PORT}`,
  );
});
