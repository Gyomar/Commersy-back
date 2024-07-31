import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../user/services/user.service';
import { PayloadToken } from '../models/token.model';
import { CreateUserDto } from 'src/modules/user/dtos/user.dtos';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userData: CreateUserDto) {
    const user = await this.userService.findByEmail(userData.email);
    if (!user) {
      const newUser = await this.userService.create(userData);
      return newUser;
    }
    return user;
  }

  generateJWT(user: { rowid: number; role: string }) {
    const payload: PayloadToken = {
      sub: { rowid: user.rowid },
      role: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
