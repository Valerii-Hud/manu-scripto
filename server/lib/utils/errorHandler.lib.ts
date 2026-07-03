import { isError } from '../../types/guards.types';
import type { Response } from 'express';
import { ENV_VARS } from '../env/envVars.lib';

export default function errorHandler(res: Response, error: unknown) {
  if (isError(error)) {
    return res.status(500).json({
      error:
        'Internal Server Error ' +
        (ENV_VARS.NODE_ENV !== 'production' ? error.message : ''),
    });
  }
}
