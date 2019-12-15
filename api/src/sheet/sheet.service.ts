import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SheetEntity } from './sheet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SheetService {
  constructor(
    @InjectRepository(SheetEntity)
    private readonly sheetRepository: Repository<SheetEntity>,
  ) {}

  async getByReference(reference: string) {
    // todo : secure string
    return await this.sheetRepository.find({ where: { reference } });
  }
}
