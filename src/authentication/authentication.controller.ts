import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationCredentialsDto } from './dto/authentication-credentials.dto';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('/signup')
  signUp(
    @Body() authCredentialsDto: AuthenticationCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthenticationCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
