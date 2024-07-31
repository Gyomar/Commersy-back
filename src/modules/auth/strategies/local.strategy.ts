import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import { Strategy } from 'passport-local';
import { CreateUserDto } from 'src/modules/user/dtos/user.dtos';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'pass',
    });
  }

  async validate(userData: CreateUserDto) {
    const user = await this.authService.validateUser(userData);
    if (!user) {
      throw new UnauthorizedException('not allow');
    }
    return user;
  }
}
