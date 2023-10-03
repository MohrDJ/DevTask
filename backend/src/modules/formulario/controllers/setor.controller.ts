import { Controller, Get } from '@nestjs/common';
import { SetorEntity } from '../entities/setor.entity';
import { SetorService } from '../services/setor.service';

@Controller('setor')
export class SetorController {
  constructor(private readonly setorService: SetorService) {}

  @Get()
  async findAll(): Promise<SetorEntity[]> {
    return this.setorService.findAll();
  }
}
