import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { TipoTicketEntity } from './tipoticket.entity';
import { SetorEntity } from './setor.entity';

@Entity('DTASK_TICKET') 
export class FormularioEntity {
  @PrimaryGeneratedColumn({name:'ID',type:'int'})
  id: number;

  @ManyToOne(() => TipoTicketEntity) 
  @JoinColumn({ name: 'ID_TIPO_TICKET' })
  id_tipo_ticket: TipoTicketEntity; 

  @Column({ name:'NOMESOLICITANTE', length: 120 })
  nomesolicitante: string;

  @Column({name:'EMAILSOLICITANTE', length: 255 })
  emailsolicitante: string;

  @Column({name:'TELEFONE', type: 'varchar', length: 15 })
  telefone: string; 

  @ManyToOne(() => SetorEntity)
  @JoinColumn({ name: 'SETOR' })
  setor: SetorEntity;

  @Column({ name:'DESCRICAO', length: 1500 })
  descricao: string;

  @Column({ name:'DATACRIACAO',type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  datacriacao: Date;

  @Column({name:'ETAPA'})
  etapa: string;

  @Column({name:'ABERTURA',type:'int'})
  abertura: number;

  @Column({name:'TITULO'})
  titulo: string;
}
