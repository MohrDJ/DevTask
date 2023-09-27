import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormularioModel } from './formulario/formulario.model';
import { FormularioController } from './formulario/formulario.controller';
import { FormularioService } from './formulario/formulario.services';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: '192.131.2.170',
      port: 1521,
      username: 'sankhya',
      password: 't363fir8',
      database: 'APEX_TEST',
      entities: [FormularioModel],
      synchronize: false, // Ative apenas em ambiente de desenvolvimento
    }),
    TypeOrmModule.forFeature([FormularioModel]),
  ],
  controllers: [FormularioController],
  providers: [FormularioService],
})
export class AppModule {}
