import { Controller, Delete, Get, Post, Put } from "@nestjs/common";

@Controller('/formulario')
export class FormularioController {
    @Get()
    public gelall(): any {
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