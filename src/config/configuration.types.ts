export interface ProjectConfig {
  apiPrefix: string;
  name: string;
  version: string;
  description: string;
  author: {
    name: string;
    email: string;
    url: string;
  };
  repository: string;
  bugs: string;
  homepage: string;
}

export interface AppConfig {
  project: ProjectConfig;
  server: {
    isProd: boolean;
    port: number;
    context: string;
    origins: string[] | '*';
    allowedHeaders: string;
    allowedMethods: string;
    corsEnabled: boolean;
    corsCredentials: boolean;
  };
  swagger: {
    path: string;
    enabled: boolean;
  };
  postgres: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    logging: string;
    type: string;
    sync: boolean;
    autoSchemaSync: boolean;
    ssl: boolean;
  };
}
