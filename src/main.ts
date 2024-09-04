import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Board CRUD')
    .setDescription('내 첫 Nest')
    .setVersion('1.0')
    .build();
  const documents = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, documents);

  await app.listen(3000);
}
bootstrap();
