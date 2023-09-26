import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { FormularioModule } from './modules/formulario.module';

@Module({
  imports: [FormularioModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
