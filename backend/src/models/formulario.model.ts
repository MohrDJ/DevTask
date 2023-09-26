import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class FormularioModel {
    @PrimaryGeneratedColumn()
    id_tipo_ticket: number;

    @Column({length: 120})
    nomesolicitante: string;

    @Column({length: 255})
    emailsolicitante: string;

    @Column('int')
    telefone: string;

    @Column('int')
    setor: number;

    @Column({length: 1500})
    descricao: string;

    @Column({})
    datacriacao: Date;

    @Column({})
    etapa:string;

    @Column({})
    abertura:number;
    
    @Column({})
    titulo: string;

}