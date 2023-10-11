import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { FormularioEntity } from 'src/modules/formulario/entities/formulario.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UploadEntity } from '../upload/entities/upload.entity';
import { DB_ORACLE_DATABASE } from 'src/shared/database.provider';
import { TicketUploadDto } from './dto/ticketDto';
import { identity } from 'rxjs';
import * as crypto from 'crypto';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadEntity, DB_ORACLE_DATABASE)
    private uploadRepository: Repository<UploadEntity>,
    @InjectRepository(FormularioEntity, DB_ORACLE_DATABASE)
    private formularioRepository: Repository<FormularioEntity>,
  ) {}

  async uploadArquivo(
    file: Express.Multer.File,
    ticketDTO: TicketUploadDto
  ): Promise<string> {
    // Verifique se ticketId é um número válido
    if (isNaN(ticketDTO.ticketId)) {
      throw new BadRequestException('ID do ticket inválido.');
    }

    const uploadDir = '\\\\192.131.2.206\\arquivos'; // Diretório de upload
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/pdf', // PDF
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel (XLSX)
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Word (DOCX)
    ];

    // Verifica se o tipo de arquivo é permitido
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Tipo de arquivo não suportado.');
    }

    // Verifica se o ticketId é válido consultando o banco de dados
    const formulario = await this.formularioRepository.findOne({ where: { id: ticketDTO.ticketId } });

    if (!formulario) {
      throw new BadRequestException('ID de ticket inválido.');
    }

    // Gere uma criptografia única baseada no nome original do arquivo
    const fileExtension = path.extname(file.originalname);
    const uniqueString = `${ticketDTO.ticketId}_${Date.now()}_${file.originalname}`;
    const uniqueHash = crypto.createHash('md5').update(uniqueString).digest('hex');

    // Crie o nome do arquivo combinando os elementos necessários
    const imageFileName = `DevTask_${ticketDTO.ticketId}_${uniqueHash}${fileExtension}`;
    const imagePath = path.join(uploadDir, imageFileName);

    // Certifique-se de que o diretório de destino existe
    if (!fs.existsSync(uploadDir)) {
      // Se o diretório não existe, crie-o
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Salve a imagem no sistema de arquivos
    try {
      fs.writeFileSync(imagePath, fs.readFileSync(file.path));
    } catch (error) {
      throw new Error(`Erro ao salvar a imagem: ${error.message}`);
    }

    // Crie a URL da imagem com base no caminho do servidor
    const imageUrl = `http://DevTask.com/${imagePath}`;

    // Salve a URL e o relacionamento no banco de dados
    const image = new UploadEntity();
    image.nome_arquivo = imageFileName;
    image.url = imageUrl;
    image.tipoTicket = formulario;

    try {
      await this.uploadRepository.save(image);
    } catch (error) {
      // Em caso de erro ao salvar no banco de dados, exclua a imagem salva no sistema de arquivos
      fs.unlinkSync(imagePath);
      throw new Error(`Erro ao salvar a URL da imagem no banco de dados: ${error.message}`);
    }

    return imageUrl;
  }
}
