import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../upload/upload.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<string> {
    const customFileName = 'meu_nome_de_arquivo.jpg'; // Substitua pelo nome desejado
    const imageUrl = await this.imageService.uploadArquivo(file, customFileName);
    return imageUrl;
  }
}
