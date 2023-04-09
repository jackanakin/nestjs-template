import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { SignUpDto } from 'src/register/dto/register-signup.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(signUpDto: SignUpDto) {
    const { name, password, login } = signUpDto;

    const loginInUse = await this.find({ where: { login } });

    if (loginInUse) {
      throw new UnprocessableEntityException('login in use');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ name, login, password: hashedPassword });

    await this.save(user);
  }
}
