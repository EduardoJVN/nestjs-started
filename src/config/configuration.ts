import { registerAs } from '@nestjs/config';
import * as PACKAGE_JSON from '../../package.json';

export default registerAs('config', () => ({
  project: {
    apiPrefix: process.env.API_PREFIX || 'API-PREFIX',
    name: PACKAGE_JSON.name,
    version: PACKAGE_JSON.version,
    description: PACKAGE_JSON.description,
    author: PACKAGE_JSON.author,
    repository: PACKAGE_JSON.repository,
    bugs: PACKAGE_JSON.bugs,
    homepage: PACKAGE_JSON.homepage,
  },
  server: {
    isProd: process.env.NODE_ENV === 'production',
    port: (process.env.PORT && parseInt(process.env.PORT, 10)) || 8080,
    context: process.env.CONTEXT || 'v1',
    origins: process.env.ORIGINS ? process.env.ORIGINS.split(',') : '*',
    allowedHeaders: process.env.ALLOWED_HEADERS,
    allowedMethods: process.env.ALLOWED_METHODS,
    corsEnabled: process.env.CORS_ENABLED || false,
    corsCredentials: process.env.CORS_CREDENTIALS || false,
  },
  swagger: {
    path: process.env.SWAGGER_PATH || 'docs',
    enabled: process.env.SWAGGER_ENABLED || false,
  },
  params: {},
  services: {},
  postgres: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'test',
    logging: process.env.DB_LOGGIN || 'all',
    type: process.env.DB_TYPE || 'postgres',
    sync: process.env.DB_SYNC == '1' ? true : false,
    autoSchemaSync: process.env.DB_AUTO_SCHEMA_SYNC == '1' ? true : false,
    ssl: process.env.DB_SSL == '1' ? true : false,
  },
}));
