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

export class UserDto extends BaseDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name: string;

  @IsEmail({}, { message: TextPick.Common.Validation.invalidEmail })
  @Validate(IsUserAlreadyExist, {
    message: TextPick.Common.Validation.emailInUse,
  })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: TextPick.Common.Validation.weakPassword,
  })
  password: string;

  @IsEnum(Languages, { message: TextPick.Common.Validation.invalidLanguage })
  language: Languages;
}
