import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

import { Languages } from 'src/@i18n/enum/languages.enum';
import TextPick from 'src/@i18n/pick.i18n';
import { IsUserAlreadyExist } from '../../register/validators/user.validator';
import { BaseDto } from 'src/@base/dto/base.dto';
import { getEnumValues } from 'src/@utilities/enum/all.enum';

export class UserDto extends BaseDto {
  @ApiProperty({ description: 'User name', minLength: 4, maxLength: 50 })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name: string;

  @ApiProperty({ description: 'User email' })
  @IsEmail({}, { message: TextPick.Common.Validation.invalidEmail })
  @Validate(IsUserAlreadyExist, {
    message: TextPick.Common.Validation.emailInUse,
  })
  email: string;

  @ApiProperty({ description: 'User password', minLength: 8, maxLength: 32 })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: TextPick.Common.Validation.weakPassword,
  })
  password: string;

  @ApiProperty({ description: 'Language', enum: [getEnumValues(Languages)] })
  @IsEnum(Languages, { message: TextPick.Common.Validation.invalidLanguage })
  language: Languages;
}
