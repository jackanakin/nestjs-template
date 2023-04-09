import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { SignInRequestDto } from './dto/signin-request.dto';
import { UserRepository } from '../users/entity/user.repository';
import { JwtPayload } from './config/jwt-payload.interface';
import { SignInResponseDto } from './dto/signin-response.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInRequestDto): Promise<SignInResponseDto> {
    const { password, login } = signInDto;

    const user = this.userRepository.findOne({ where: { login } });

    if (user && bcrypt.compare(password, (await user).password)) {
      const payload: JwtPayload = { login };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Wrong credentials');
    }
  }
}
