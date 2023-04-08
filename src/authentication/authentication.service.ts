import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthenticationCredentialsDto } from './dto/authentication-credentials.dto';
import { UserRepository } from './entity/user.repository';
import { JwtPayload } from './config/jwt-payload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthenticationCredentialsDto) {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthenticationCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { password, login } = authCredentialsDto;

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
