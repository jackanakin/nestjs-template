import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { JwtPayload } from './jwt-payload.interface';
import { User } from 'src/users/entity/user.entity';
import { UserRepository } from '../../users/entity/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    } as StrategyOptions);
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { login } = payload;
    const user: User = await this.userRepository.findOne({
      where: { login },
    });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
