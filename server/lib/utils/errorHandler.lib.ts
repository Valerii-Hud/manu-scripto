import { isError } from '../../types/guards.types';
import type { Response } from 'express';
import { ENV_VARS } from '../env/envVars.lib';

type Status = 500 | 404 | 400 | 401;

export default function errorHandler(
  res: Response,
  error: unknown,
  status: Status = 500,
  message: string = 'Internal Server Error'
) {
  if (isError(error)) {
    return res.status(status).json({
      error:
        message +
        ' ' +
        (ENV_VARS.NODE_ENV !== 'production' ? error.message : ''),
    });
  }
}
