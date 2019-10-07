import { Module } from '@nestjs/common';
import { VetsService } from './vets.service';
import { VetsController } from './vets.controller';
import { VetsResolver } from './vets.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { VetModel } from './models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VetModel.modelName, schema: VetModel.schema },
    ]),
  ],
  providers: [VetsService, VetsResolver],
  controllers: [VetsController],
})
export class VetsModule {}
