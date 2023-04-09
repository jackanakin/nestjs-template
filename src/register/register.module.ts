import { Module } from '@nestjs/common';

import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  providers: [RegisterService],
  controllers: [RegisterController],
  imports: [UsersModule, AuthenticationModule],
})
export class RegisterModule {}
