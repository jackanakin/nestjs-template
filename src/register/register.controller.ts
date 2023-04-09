import {
  Body,
  Controller,
  Logger,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SignUpRequestDto } from './dto/signup-request.dto';
import { RegisterService } from './register.service';
import { GetUser } from 'src/authentication/config/get-user.decorator';
import { User } from 'src/users/entity/user.entity';

@Controller('register')
export class RegisterController {
  private logger: Logger = new Logger('RegisterController');

  constructor(private registerService: RegisterService) {}

  @Post()
  async signUp(
    @Req() request: Request,
    @Body() signUpDto: SignUpRequestDto,
  ): Promise<void> {
    await this.registerService.signUp(signUpDto);
    return;
  }

  @UseGuards(AuthGuard())
  @Patch()
  async update(@GetUser() user: User): Promise<void> {
    return;
  }
}
