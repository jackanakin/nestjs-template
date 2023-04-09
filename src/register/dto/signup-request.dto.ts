import {
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Languages } from 'src/@i18n/enum/languages.enum';
import TextPick from 'src/@i18n/pick.i18n';

export class SignUpRequestDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  login: string;

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
