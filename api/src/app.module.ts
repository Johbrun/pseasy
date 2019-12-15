import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheetController } from './sheet/sheet.controller';
import { SheetModule } from './sheet/sheet.module';

@Module({
  imports: [TypeOrmModule.forRoot(), SheetModule],
  controllers: [AppController, SheetController],
  providers: [AppService],
})
export class AppModule {}
