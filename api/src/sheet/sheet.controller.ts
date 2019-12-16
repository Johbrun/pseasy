import { Controller, Get, Query } from '@nestjs/common';
import { SheetService } from './sheet.service';

@Controller('sheets')
export class SheetController {
  constructor(private readonly sheetService: SheetService) {}

  @Get()
  getByReference(
    @Query('reference') reference: string,
    @Query('fields') fields: string[],
  ) {
    return this.sheetService.getAll({ reference, fields });
  }
}
