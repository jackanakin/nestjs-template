import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { UserDto } from '../users/dto/user.dto';
import { RegisterService } from './register.service';
import { GetUser } from 'src/authentication/config/get-user.decorator';
import { PartialUserDto } from './dto/patch-user.dto';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @ApiCreatedResponse({})
  @ApiUnprocessableEntityResponse({ type: String })
  @Post()
  async post(@Body() userDto: UserDto): Promise<void> {
    await this.registerService.signUp(userDto);

    return;
  }

  @ApiBasicAuth()
  @ApiOkResponse()
  @UseGuards(AuthGuard())
  @Patch()
  async patch(
    @GetUser() user,
    @Body() patchDto: PartialUserDto,
  ): Promise<void> {
    await this.registerService.patch(patchDto, user.id);

    return;
  }
}
