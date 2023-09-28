import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('DTASK_TIPO_TICKET')
export class TipoTicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;
}
