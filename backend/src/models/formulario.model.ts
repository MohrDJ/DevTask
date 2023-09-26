import { Entity } from 'typeorm'

@Entity()
export class FormularioModel {

    id_tipo_ticket: number;
    @column({length})
    nomesolicitante: string;
    emailsolicitante: string;
    telefone: string;
    setor: number;
    descricao: string;
    datacriacao: Date;
    etapa:string;
    abertura:number;
    titulo: string;

}