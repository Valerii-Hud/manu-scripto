import { isError } from '../../types/guards.types';
import { ENV_VARS } from '../env/envVars.lib';
import type { Response } from 'express';

export default function errorHandler(res: Response, error: unknown) {
  const { NODE_ENV } = ENV_VARS;

  if (isError(error)) {
    return res.status(500).json({
      error:
        'Internal Server Error ' +
        (NODE_ENV !== 'production' ? error.message : ''),
    });
  }
}
