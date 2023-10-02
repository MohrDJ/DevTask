import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express';
import { FindOneOptions, Repository } from 'typeorm';
import { Image } from '../upload/entities/upload.entity';
import { FormularioEntity } from 'src/modules/formulario/entities/formulario.entity';

@Injectable()
export class ArquivoService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    @InjectRepository(FormularioEntity)
    private formularioRepository: Repository<FormularioEntity>,
  ) {}

  async uploadArquivo(
    file: Express.Multer.File,
    customFileName: string, // Adicione este parâmetro
    ticketId: number
  ): Promise<string> {
    const uploadDir = 'uploads'; // Diretório de upload
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf', // PDF
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel (XLSX)
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Word (DOCX)
    ];

    // Verifique se o tipo de arquivo é permitido
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Tipo de arquivo não suportado.');
    }

    // Use o nome de arquivo com base no ID do ticket e no customFileName
    const imageFileName = `DevTask${ticketId}_${Date.now()}_${customFileName}`;
    const imagePath = path.join(uploadDir, imageFileName);

    // Salve a imagem no sistema de arquivos
    try {
      fs.writeFileSync(imagePath, file.buffer);
    } catch (error) {
      throw new Error(`Erro ao salvar a imagem: ${error.message}`);
    }

    // Crie a URL da imagem com base no caminho do servidor
    const imageUrl = `http://seu-servidor.com/${imagePath}`;

    // Busque a instância de FormularioEntity com base no ID do ticket
    const formulario = await this.formularioRepository.findOne({ where: { id: ticketId } } as FindOneOptions<FormularioEntity>);

    if (!formulario) {
      throw new BadRequestException('Formulário não encontrado.');
    }

    // Salve a URL e o relacionamento no banco de dados
    const image = new Image();
    image.nome_arquivo = imageFileName;
    image.url = imageUrl;
    image.tipoTicket = formulario;

    try {
      await this.imageRepository.save(image);
    } catch (error) {
      // Em caso de erro ao salvar no banco de dados, exclua a imagem salva no sistema de arquivos
      fs.unlinkSync(imagePath);
      throw new Error(`Erro ao salvar a URL da imagem no banco de dados: ${error.message}`);
    }

    return imageUrl;
  }
}
