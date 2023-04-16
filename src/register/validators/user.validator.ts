import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import { RegisterService } from '../register.service';

@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
@Injectable()
export class IsUserAlreadyExist implements ValidatorConstraintInterface {
  constructor(private registerService: RegisterService) {}

  public async validate(email: string) {
    const user = await this.registerService.findByEmail(email);

    return !user;
  }
}
