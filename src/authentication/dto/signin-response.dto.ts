import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty({
    description: 'Access token',
  })
  accessToken: string;
}
