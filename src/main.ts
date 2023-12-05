import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { FabrikaConfigModule } from './config/config.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Books API')
    .setDescription('The Books API')
    .setVersion('1.0')
    .addTag('books')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 9000;
  await app.listen(port);
}
bootstrap();