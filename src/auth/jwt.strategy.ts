import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UsersService } from '../users/users.service';
import { UserResponse } from '../users/dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any): Promise<UserResponse> {
    const { username } = payload;
    const json = (await this.userService.findByEmail(username)).toJSON();
    return plainToClass(UserResponse, json);
  }
}
