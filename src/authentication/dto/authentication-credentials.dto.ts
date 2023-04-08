import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthenticationCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  login: string;

  @IsString()
  // @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Weak password',
  })
  password: string;
}
