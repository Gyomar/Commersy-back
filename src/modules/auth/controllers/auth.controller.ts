import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PayloadToken } from '../models/token.model';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/modules/user/dtos/user.dtos';
import { ApiKeyGuard } from '../guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('renew-token')
  async renewToken(@Body() body: { user: PayloadToken }) {
    const user = body.user;
    const newToken = this.authService.generateJWT({
      rowid: user.sub.rowid,
      role: user.role,
    });

    return newToken;
  }

  @Post('validate')
  async validateEmail(@Body() body: { user: CreateUserDto }) {
    try {
      const user = await this.authService.validateUser(body.user);
      if (user) {
        const token = this.authService.generateJWT(user);
        return token;
      } else {
        return { error: 'Email no válido' };
      }
    } catch (error) {
      return { error: 'Error en la validación del email' };
    }
  }
}
