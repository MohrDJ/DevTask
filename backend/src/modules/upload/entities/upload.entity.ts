import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FormularioEntity } from 'src/modules/formulario/entities/formulario.entity';

@Entity('DTASK_ARQUIVOS')
export class UploadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FormularioEntity) 
  @JoinColumn({ name: 'ID_TICKET' })
  tipoTicket: FormularioEntity; 

  @Column()
  nome_arquivo: string;

  @Column()
  url: string;
}
