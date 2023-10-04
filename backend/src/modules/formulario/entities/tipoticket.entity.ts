import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('DTASK_TIPO_TICKET')
export class TipoTicketEntity {
  @PrimaryGeneratedColumn({name:'ID',type:'int'})
  id: number;

  @Column({ name: 'NOME' })
  nome: string;

  @Column({ name: 'DESCRITIVO' })
  descritivo: string;
}
