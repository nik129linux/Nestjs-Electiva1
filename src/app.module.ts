import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ProductosController } from './productos/productos.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, ProductosController],
  providers: [AppService],
})
export class AppModule {}
