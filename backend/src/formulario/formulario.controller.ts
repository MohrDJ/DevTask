import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FormularioModel } from './formulario.model';
import { FormularioService } from '../formulario/formulario.services';

@Controller('formulario')
export class FormularioController {
  constructor(private readonly formularioService: FormularioService) {}

  @Post()
  create(@Body() formularioData: FormularioModel): Promise<FormularioModel> {
    return this.formularioService.create(formularioData);
  }

  @Get()
  findAll(): Promise<FormularioModel[]> {
    return this.formularioService.findAll();
  }

//   @Get(':id')
//   findOne(@Param('id') id: number): Promise<FormularioModel> {
//     return this.formularioService.findOne(id);
//   }

}
