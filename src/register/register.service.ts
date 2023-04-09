import { Injectable } from '@nestjs/common';

import { UserRepository } from 'src/users/entity/user.repository';
import { SignUpRequestDto } from './dto/signup-request.dto';

@Injectable()
export class RegisterService {
  constructor(private userRepository: UserRepository) {}

  async signUp(signUpDto: SignUpRequestDto) {
    return this.userRepository.createUser(signUpDto);
  }
}
