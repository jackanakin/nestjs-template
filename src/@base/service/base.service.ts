import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';

import { BaseDto } from '../dto/base.dto';

@Injectable()
export class BaseService<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(baseDto: BaseDto): Promise<T> {
    const entity: T = await this.create(baseDto);

    return this.repository.save(entity);
  }

  async patch(patchDto: DeepPartial<T>, id: number): Promise<any> {
    return this.repository.save({ id, ...patchDto });
  }
}
