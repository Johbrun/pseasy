import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SheetEntity } from './sheet.entity';
import { Repository } from 'typeorm';
import { ISheetQuery } from './sheetQuery.interface';

@Injectable()
export class SheetService {
  constructor(
    @InjectRepository(SheetEntity)
    private readonly sheetRepository: Repository<SheetEntity>,
  ) {}

  async getAll(query: ISheetQuery) {
    // todo : secure string
    let args = {};
    if (query.reference) {
      args = { ...args, where: { reference: query.reference } };
    }
    if (query.fields) {
      args = { ...args, select: [...query.fields] };
    }

    return await this.sheetRepository.find(args);
  }
}
