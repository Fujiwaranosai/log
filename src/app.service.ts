import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogEntity } from 'db';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectRepository(LogEntity) private logRepo: Repository<LogEntity>) {}

  log(data: Partial<LogEntity>) {
    return this.logRepo.save(data);
  }
}
