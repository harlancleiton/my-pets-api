import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { PetsResolver } from './pets.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PetModel } from './models';
import { ConfigModule } from '../config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PetModel.modelName, schema: PetModel.schema },
    ]),
    ConfigModule,
  ],
  providers: [PetsService, PetsResolver],
  controllers: [PetsController],
})
export class PetsModule {}
