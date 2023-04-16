import { Injectable } from '@nestjs/common';

import { UserRepository } from 'src/users/entity/user.repository';
import { User } from 'src/users/entity/user.entity';
import { UserDto } from '../users/dto/user.dto';
import { BaseService } from 'src/@base/service/base.service';

@Injectable()
export class RegisterService extends BaseService<User> {
  constructor(protected readonly repository: UserRepository) {
    super(repository);
  }

  public async findByEmail(email: string): Promise<User> {
    if (!email) return null;

    const user = await this.repository.findOne({
      where: { email },
    });

    return user;
  }

  async signUp(userDto: UserDto): Promise<void> {
    return this.repository.createUser(userDto);
  }
}
