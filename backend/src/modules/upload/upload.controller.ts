import { BadRequestException, Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FormularioService } from 'src/modules/formulario/services/formulario.service';
import { UploadService } from '../upload/upload.service';
import { TicketUploadDto } from './dto/ticketDto';
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
    
    ticketUploadDto.file = file.mimetype;
    
    const imageUrl = await this.imageService.uploadArquivo(file,ticketUploadDto);
    return imageUrl;
  }
}
