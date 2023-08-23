import { Module } from '@nestjs/common';
import { CommitsController } from './commits.controller';
import { CommitsService } from './commits.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [CommitsController],
  providers: [CommitsService],
  imports: [HttpModule]
})
export class CommitsModule {}
