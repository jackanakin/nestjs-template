import { Module } from '@nestjs/common';

import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { IsUserAlreadyExist } from './validators/user.validator';

@Module({
  providers: [RegisterService, IsUserAlreadyExist],
  controllers: [RegisterController],
  imports: [UsersModule, AuthenticationModule],
})
export class RegisterModule {}
