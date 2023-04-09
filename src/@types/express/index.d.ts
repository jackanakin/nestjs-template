// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
