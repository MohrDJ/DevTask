import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('PORMADE_SETORES')
export class SetorEntity {
    @PrimaryGeneratedColumn({name:'ID',type:'int'})
    id: number;

    @Column({ name: 'NOME' })
    nome: string;
    
    @Column({ name: 'INATIVO', type: 'number', default: 0 })
    inativo: number;
}
