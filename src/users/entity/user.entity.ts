import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Languages } from 'src/@i18n/enum/languages.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column()
  language: Languages;
}
