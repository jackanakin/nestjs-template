import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './entity/user.repository';

@Module({
  providers: [UsersService, UserRepository],
  exports: [UserRepository],
})
export class UsersModule {}
