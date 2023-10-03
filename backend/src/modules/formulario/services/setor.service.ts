import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DB_ORACLE_DATABASE } from 'src/shared/database.provider';
import { SetorEntity } from '../entities/setor.entity';

@Injectable()
export class SetorService {
  constructor(
    @InjectRepository(SetorEntity, DB_ORACLE_DATABASE)
    private readonly setorRepository: Repository<SetorEntity>,
  ) {}

  async findAll(): Promise<SetorEntity[]> {
    return this.setorRepository.find();
  }
}
