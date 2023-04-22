import { OmitType, PartialType } from '@nestjs/swagger';

import { UserDto } from 'src/users/dto/user.dto';

export class PatchUserDto extends OmitType(UserDto, [
  'password',
  'email',
] as const) {}

export class PartialUserDto extends PartialType(PatchUserDto) {}
