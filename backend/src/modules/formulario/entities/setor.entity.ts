import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('PORMADE_SETORES')
export class SetorEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nome: string;
  
    @Column({ name: 'INATIVO', type: 'number', default: 0 })
    inativo: number;
}
