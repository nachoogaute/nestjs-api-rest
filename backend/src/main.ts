import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle("Users Login API")
  .setDescription("The users API description")
  .setVersion("1.0")
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup("docs", app, document);

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(parseInt(process.env.PORT) || 8000);
}
bootstrap();
