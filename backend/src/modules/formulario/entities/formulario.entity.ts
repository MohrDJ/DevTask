import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DTASK_TICKET') 
export class FormularioEntity {
  @PrimaryGeneratedColumn()
  id_tipo_ticket: number;

  @Column({ length: 120 })
  nomesolicitante: string;

  @Column({ length: 255 })
  emailsolicitante: string;

  @Column({ type: 'varchar', length: 15 })
  telefone: string; 

  @Column('int')
  setor: number; 

  @Column({ length: 1500 })
  descricao: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  datacriacao: Date;

  @Column()
  etapa: string;

  @Column('int')
  abertura: number;

  @Column()
  titulo: string;
}
