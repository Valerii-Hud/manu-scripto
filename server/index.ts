import express from 'express';
import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv';
import { ENV_VARS } from './lib/env/envVars.lib';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.listen(ENV_VARS.PORT, () => {
  console.log(
    `Server running at: ${ENV_VARS.PROTOCOL}://${ENV_VARS.DOMAIN}:${ENV_VARS.PORT}`
  );
});
