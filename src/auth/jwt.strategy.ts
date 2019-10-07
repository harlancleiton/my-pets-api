import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UsersService } from '../users/users.service';
import { UserResponse } from '../users/dto';
import { ConfigService } from '../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    });
  }

  async validate(payload: any): Promise<UserResponse> {
    const { username } = payload;
    const json = (await this.userService.findByEmail(username)).toJSON();
    return plainToClass(UserResponse, json);
  }
}
