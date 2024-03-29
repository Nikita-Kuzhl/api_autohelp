import { ValidationPipe } from './pipes/validation.pipe';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule,{cors:true});

  const config = new DocumentBuilder()
    .setTitle('Api Autohelp')
    .setDescription('API для сайта Autohelp')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs',app,document)

  app.useGlobalPipes(new ValidationPipe)

  await app.listen(PORT, () => console.log(`SERVER STARTED ON PORT - ${PORT}`));
}
start();
