import type { EnvVars } from '../../types/interfaces.types';

const { PORT, DOMAIN, PROTOCOL, NODE_ENV } = process.env;

const NODE_ENV_LIST = ['development', 'production', 'tests'];

if (!NODE_ENV_LIST.includes(NODE_ENV ?? '')) {
  throw new Error('Invalid NODE_ENV');
}

const port = Number(PORT);

if (!PROTOCOL) {
  throw new Error('Protocol not provided');
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

export const ENV_VARS: EnvVars = {
  PROTOCOL,
  DOMAIN,
  PORT: port,
};
