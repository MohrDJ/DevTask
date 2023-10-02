import { IsNumber } from 'class-validator';

export class TicketUploadDto {
  image: Express.Multer.File;
  
  @IsNumber()
  ticketId: number;
}
