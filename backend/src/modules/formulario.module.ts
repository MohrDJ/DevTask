import { Module } from "@nestjs/common";
import { FormularioController } from "src/controllers/formulario.controller";

@Module({
    controllers: [FormularioController],
})
export class FormularioModule {}