import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('PORMADE_SETORES')
export class SetorEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
