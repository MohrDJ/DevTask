import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { FormularioModel } from './formulario/formulario.model';
import { FormularioController } from './formulario/formulario.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'oracle',
    host: '192.131.2.170',
    port: 1521,
    username: 'sankhya',
    password: 't363fir8',
    database: 'APEX_TEST',
    entities: [FormularioModel], //adicionar tabelas aqui
    //synchronize: false,
  }),
], controllers:[FormularioController]
})
export class AppModule {}
