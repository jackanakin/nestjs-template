import { Injectable } from '@nestjs/common';

import { UserRepository } from './entity/user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
}
