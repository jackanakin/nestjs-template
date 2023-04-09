import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/entity/user.repository';
import { SignUpDto } from './dto/register-signup.dto';

@Injectable()
export class RegisterService {
  constructor(private userRepository: UserRepository) {}

  async signUp(signUpDto: SignUpDto) {
    return this.userRepository.createUser(signUpDto);
  }
}
