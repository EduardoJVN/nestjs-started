import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import swaggerStats from 'swagger-stats';
import { AppConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });

  const configService = app.get(ConfigService);

  const config = configService.get<AppConfig>('config');

  if (!config || typeof config !== 'object') {
    throw new Error('❌ No se pudo cargar la configuración desde ConfigService');
  }

  const { server, swagger, project } = config;
  app.setGlobalPrefix(`${server.context}`);
  app.use([cookieParser(), helmet(), compression()]);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (swagger.enabled) {
    const config = new DocumentBuilder()
      .setTitle(`${project.name}`)
      .setVersion(`${project.version}`)
      .setDescription(`Swagger - ${project.description}`)
      .setExternalDoc('Documentation', project.homepage)
      .setContact(project.author.name, project.author.url, project.author.email)
      .addServer(`/${server.context}`)
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: true,
    });

    const statsMiddleware = swaggerStats.getMiddleware({
      name: project.name,
      version: project.version,
      uriPath: '/v1/swagger-stats',
      swaggerSpec: document,
      onAuthenticate: (req, username, password) => username === 'admin' && password === 'admin',
    });
    app.use(statsMiddleware);
    SwaggerModule.setup(`${server.context}/${swagger.path}`, app, document, {});
  }

  if (server.corsEnabled) {
    app.enableCors({
      origin: server.origins,
      allowedHeaders: `${server.allowedHeaders}`,
      methods: `${server.allowedMethods}`,
      credentials: server.corsCredentials,
    });
  }

  await app.listen(server.port, () => {
    const appServer = `http://localhost:${server.port}/${server.context}`;
    Logger.log(`📚 Swagger is running on: ${appServer}/${swagger.path}`, `${project.name}`);
    Logger.log(
      `📚 Swagger Stats is running on: http://localhost:${server.port}/v1/swagger-stats`,
      `${project.name}`,
    );
    Logger.log(`🚀 Application is running on: ${appServer}`, `${project.name}`);
  });
}
void bootstrap();
