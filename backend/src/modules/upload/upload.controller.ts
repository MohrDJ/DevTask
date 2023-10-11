import { BadRequestException, Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FormularioService } from 'src/modules/formulario/services/formulario.service';
import { UploadService } from '../upload/upload.service';
import { TicketUploadDto } from './ticketDto';
import multerConfig from './multer.config';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('arquivos')
export class UploadController {
  constructor(
    private readonly imageService: UploadService,
    private readonly formularioService: FormularioService,
  ) {}

  @Post('upload')
 @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() ticketUploadDto: TicketUploadDto,
  ){
    console.log(file)
    const customFileName = file.mimetype;

    const { ticketId } = ticketUploadDto;

    // Verifica se o ticketId é válido consultando o banco de dados
    const formulario = await this.formularioService.findOneByTicketId(ticketId);

    if (!formulario) {
      throw new BadRequestException('ID de ticket inválido.');
    }

    const imageUrl = await this.imageService.uploadArquivo(file, customFileName, ticketId);
    return imageUrl;
  }
}
