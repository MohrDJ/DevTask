import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormularioModule } from './modules/formulario/formulario.module';
import { dataBaseConfigOracle } from './shared/database.provider';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseConfigOracle),
    FormularioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
