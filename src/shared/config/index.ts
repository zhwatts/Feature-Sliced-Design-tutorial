/**
 * Module for initializing env variables
 * @remark If the value of any variable is not found,
 * the application will immediately throw an error during module initialization
 * @module
 */

/**
 * Get env variable
 * @throwable
 */

const getEnvVar = (key: string) => {
  if (import.meta.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return import.meta.env[key] || '';
};

/** API entrypoint */
export const API_URL = getEnvVar('VITE_API_URL');

/** Program execution mode */
export const NODE_ENV = getEnvVar('MODE');
/** Development mode */
export const isDevEnv = NODE_ENV === 'development';
/** Production mode */
export const isProdEnv = NODE_ENV === 'production';
