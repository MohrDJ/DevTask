import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FormularioService } from './formulario.service';
import { FormularioEntity } from './entities/formulario.entity';

@Controller('formulario')
export class FormularioController {
  constructor(private readonly formularioService: FormularioService) {}

  @Post()
  async create(@Body() formularioCriar: FormularioEntity) { 
    const createdFormulario = await this.formularioService.create(formularioCriar);
    return createdFormulario;
  }

  @Get()
  findAll() {
    return this.formularioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FormularioEntity | undefined> {
    return this.formularioService.findOneByTicketId(+id);
  }
}
