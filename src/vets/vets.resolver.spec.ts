import { Test, TestingModule } from '@nestjs/testing';
import { VetsResolver } from './vets.resolver';

describe('VetsResolver', () => {
  let resolver: VetsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VetsResolver],
    }).compile();

    resolver = module.get<VetsResolver>(VetsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
