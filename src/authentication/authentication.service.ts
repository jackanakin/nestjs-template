import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { SignInRequestDto } from './dto/signin-request.dto';
import { UserRepository } from '../users/entity/user.repository';
import { JwtPayload } from './config/jwt-payload.interface';
import { SignInResponseDto } from './dto/signin-response.dto';
import TextPick from 'src/@i18n/pick.i18n';

@Injectable()
export class AuthenticationService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async create(signInDto: SignInRequestDto): Promise<SignInResponseDto> {
    const { password, email } = signInDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException(
        TextPick.Common.Authorization.wrongCredentials,
      );
    }
  }
}
