import { Test, TestingModule } from '@nestjs/testing';
import { DirsService } from './dirs.service';

describe('DirsService', () => {
  let service: DirsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirsService],
    }).compile();

    service = module.get<DirsService>(DirsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
