import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DTASK_TICKET') 
export class FormularioEntity {
  @PrimaryGeneratedColumn({name:'ID',type:'int'})
  id: number;

  @Column({ name: 'ID_TIPO_TICKET', type: 'int' })
  id_tipo_ticket: number;  

  @Column({ name:'NOMESOLICITANTE', length: 120 })
  nomesolicitante: string;

  @Column({name:'EMAILSOLICITANTE', length: 255 })
  emailsolicitante: string;

  @Column({name:'TELEFONE', type: 'varchar', length: 15 })
  telefone: string; 

  @Column({name:'SETOR',type:'int'})
  setor: number; 

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
