import express, { urlencoded } from 'express';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { ENV_VARS } from './lib/env/envVars.lib';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToMongoDB from './lib/db/connectToMongoDB.lib';
import protectRoute from './middlewares/protectRoute.middleware';

const app = express();
const { MONGO_URI } = ENV_VARS;

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', protectRoute, userRoutes);

app.listen(ENV_VARS.PORT, () => {
  connectToMongoDB(MONGO_URI);
  console.log(
    `Server running at: ${ENV_VARS.PROTOCOL}://${ENV_VARS.DOMAIN}:${ENV_VARS.PORT}`
  );
});
