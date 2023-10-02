import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../upload/upload.service';
import { Express } from 'express';
import { TicketUploadDto } from './TicketDto';
import { FormularioService } from 'src/modules/formulario/formulario.service';

@Controller('image')
export class UploadController {
  constructor(
    private readonly imageService: UploadService,
    private readonly formularioService: FormularioService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() ticketUploadDto: TicketUploadDto,
  ): Promise<string> {
    const customFileName = 'jpg';

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
