import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { UserDto } from '../dto/user.dto';
import TextPick from 'src/@i18n/pick.i18n';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(userDto: UserDto) {
    const { name, password, email, language } = userDto;

    const emailInUse = await this.findOne({ where: { email } });

    if (emailInUse) {
      throw new UnprocessableEntityException(
        TextPick.Modules.Register.http422.emailInUse,
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      name,
      email,
      password: hashedPassword,
      language,
    });

    await this.save(user);
  }
}
