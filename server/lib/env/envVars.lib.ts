import type { EnvVars } from '../../types/interfaces.types';
import dotenv from 'dotenv';
dotenv.config({});

const { PORT, DOMAIN, PROTOCOL, NODE_ENV, JWT_SECRET, MONGO_URI } = process.env;

const NODE_ENV_LIST = ['development', 'production', 'tests'];

const port = Number(PORT);

if (!PROTOCOL) {
  throw new Error('Protocol not provided');
}

if (!MONGO_URI) {
  throw new Error('MONGO_URI not provided');
}

if (PROTOCOL !== 'http' && NODE_ENV === 'development') {
  throw new Error('Development protocol must be http');
}

if (PROTOCOL !== 'https' && NODE_ENV === 'production') {
  throw new Error('Production protocol must be https');
}

const DOMAINS_LIST = ['localhost', '127.0.0.1', 'manu-scripto.com'];

if (!DOMAIN) {
  throw new Error('Domain not provided');
}

const isValidDomain = DOMAINS_LIST.includes(DOMAIN);

if (!isValidDomain) {
  throw new Error('Invalid Domain');
}

if (!port) {
  throw new Error('Port not provided');
}

if (typeof port !== 'number' || port < 5000 || port > 6000) {
  throw new Error('Invalid Port');
}

if (!NODE_ENV) {
  throw new Error('NODE_ENV not provided');
}

if (!NODE_ENV_LIST.includes(NODE_ENV ?? '')) {
  throw new Error('Invalid NODE_ENV');
}

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be provided');
}

if (JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters');
}

export const ENV_VARS: EnvVars = {
  PROTOCOL,
  DOMAIN,
  PORT: port,
  JWT_SECRET,
  NODE_ENV,
  MONGO_URI,
};
