import { Body, Controller, Post } from '@nestjs/common';
import { SignInRequestDto } from './dto/signin-request.dto';
import { AuthenticationService } from './authentication.service';
import { SignInResponseDto } from './dto/signin-response.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post()
  signIn(@Body() signInDto: SignInRequestDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto);
  }
}
