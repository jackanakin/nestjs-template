import { Body, Controller, Logger, Post } from '@nestjs/common';
import { SignUpDto } from './dto/register-signup.dto';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  private logger: Logger = new Logger('RegisterController');

  constructor(private registerService: RegisterService) {}

  @Post()
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    await this.registerService.signUp(signUpDto);
    return;
  }
}
