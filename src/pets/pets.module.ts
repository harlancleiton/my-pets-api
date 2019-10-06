import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { PetsResolver } from './pets.resolver';

@Module({
  providers: [PetsService, PetsResolver],
  controllers: [PetsController]
})
export class PetsModule {}
