import { Column, Entity } from 'typeorm';
import { IsEmail } from 'class-validator';

import { Languages } from 'src/@i18n/enum/languages.enum';
import { BaseEntity } from 'src/@base/entity/base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail({})
  email: string;

  @Column()
  password: string;

  @Column()
  language: Languages;
}
