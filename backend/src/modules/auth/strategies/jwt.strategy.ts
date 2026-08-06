import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log('JwtStrategy creada');
    console.log('JWT_SECRET length:', process.env.JWT_SECRET?.length);
    super({
      jwtFromRequest: (request) => {
        console.log('Authorization:', request?.headers?.authorization);

        return ExtractJwt.fromAuthHeaderAsBearerToken()(request);
      },
      ignoreExpiration: false,
      secretOrKey: Buffer.from(process.env.JWT_SECRET!, 'utf8'),
    });
  }

  validate(payload: JwtPayload) {
    console.log('JWT VALIDADO:', payload);
    return payload;
  }
}
