import { Controller, Get, Query } from '@nestjs/common';
import { SheetService } from './sheet.service';

@Controller('sheets')
export class SheetController {
  constructor(private readonly sheetService: SheetService) {}

  @Get()
  findAll(@Query('reference') reference: string) {
    return this.sheetService.getByReference(reference);
  }
}
