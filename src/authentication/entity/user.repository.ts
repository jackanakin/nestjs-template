import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthenticationCredentialsDto } from 'src/authentication/dto/authentication-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthenticationCredentialsDto) {
    const { password, login } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ login, password: hashedPassword });

    await this.save(user);
  }
}
