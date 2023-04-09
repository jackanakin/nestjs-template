import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import TextPick from 'src/@i18n/pick.i18n';
import { SignUpRequestDto } from 'src/register/dto/signup-request.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(signUpDto: SignUpRequestDto) {
    const { name, password, login, language } = signUpDto;

    const loginInUse = await this.findOne({ where: { login } });

    if (loginInUse) {
      throw new UnprocessableEntityException(
        TextPick.Modules.Register.http422.loginInUse,
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      name,
      login,
      password: hashedPassword,
      language,
    });

    await this.save(user);
  }
}
