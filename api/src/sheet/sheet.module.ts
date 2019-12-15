import { Module } from '@nestjs/common';
import { SheetService } from './sheet.service';
import { SheetController } from './sheet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheetEntity } from './sheet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SheetEntity])],
  controllers: [SheetController],
  providers: [SheetService],
  exports: [SheetService],
})
export class SheetModule {}
