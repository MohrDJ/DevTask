import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TicketUploadDto {
  @IsString()
  @IsOptional()
  file:string;
  
  @IsNumber()
  ticketId: number;
}