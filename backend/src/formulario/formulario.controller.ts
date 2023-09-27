import { Controller, Delete, Get, Injectable, Post, Put } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { FormularioModel } from "src/formulario/formulario.model";
import { Repository } from 'typeorm';

@Injectable()
@Controller('/formulario')
export class FormularioController {
      constructor(
        @InjectRepository(FormularioModel)
        private FormularioRepository: Repository<FormularioModel>,
      ) {}

    @Get()
    public gelall(): any {
        this.FormularioRepository.count()
        return { data: 'GetAll !!!'};
    }

    @Get(':id')
    public getone(): any {
        return { data: 'GetOne !!!'};
    }

    @Post()
    public create(): any {
        return { data: 'Create !!!'};
    }
}