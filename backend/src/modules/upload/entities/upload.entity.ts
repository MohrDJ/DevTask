import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FormularioEntity } from 'src/modules/formulario/entities/formulario.entity';

@Entity('DTASK_ARQUIVOS')
export class UploadEntity {
  @PrimaryGeneratedColumn({name:'ID',type:'int'})
  id: number;

  @ManyToOne(() => FormularioEntity) 
  @JoinColumn({ name: 'ID_TICKET' })
  tipoTicket: FormularioEntity; 

  @Column({name: 'NOME_ARQUIVO'})
  nome_arquivo: string;

  @Column({name: 'URL'})
  url: string;
}
