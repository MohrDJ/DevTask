import { Controller, Get, Post, Body } from '@nestjs/common';
import { FormularioService } from './formulario.service'; // Importe o serviço correto

@Controller('formulario')
export class FormularioController {
  constructor(private readonly formularioService: FormularioService) {}

  @Post()
  create(@Body() formularioData: any) {
    return this.formularioService.create(formularioData);
  }

  @Get()
  findAll() {
    return this.formularioService.findAll();
  }
}
