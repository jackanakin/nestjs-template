import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty({
    description: 'User e-mail',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
