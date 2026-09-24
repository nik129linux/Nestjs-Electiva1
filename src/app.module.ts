import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ProductosController } from './productos/productos.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, ProductosController],
  providers: [AppService, UsersService],
})
export class AppModule {}
