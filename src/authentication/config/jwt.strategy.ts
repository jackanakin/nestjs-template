import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { UserRepository } from 'src/@common/entities/user/user.repository';
import { JwtPayload } from './jwt-payload.interface';
import { User } from 'src/authentication/entity/user.entity';

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
