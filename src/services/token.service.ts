import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserEntity from 'src/database/entities/user.entity';
import TokenPayloadDto from 'src/dto/token/token-payload.dto';

@Injectable()
export default class TokenService {
  constructor(private jwtService: JwtService) {}

  private ACCESS_SECRET = process.env.ACCESS_SECRET;
  private REFRESH_SECRET = process.env.REFRESH_SECRET;

  async generateAccessToken(payload: TokenPayloadDto) {
    return await this.jwtService.signAsync(payload, {
      secret: this.ACCESS_SECRET,
      expiresIn: '6h',
    });
  }

  async generateRefreshToken(payload: TokenPayloadDto) {
    return await this.jwtService.signAsync(payload, {
      secret: this.REFRESH_SECRET,
      expiresIn: '60days',
    });
  }

  /** Просто убирает лишние поля после верификаций токена jwt */
  cleanJwtPayload(payload: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exp, iat, ...cleanedPayload } = payload;
    return cleanedPayload as TokenPayloadDto;
  }

  async verifyAccessToken(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.ACCESS_SECRET,
      ignoreExpiration: false,
    });

    return this.cleanJwtPayload(payload);
  }

  async verifyRefreshToken(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.REFRESH_SECRET,
      ignoreExpiration: false,
    });

    return this.cleanJwtPayload(payload);
  }

  async generateTokens(user: UserEntity) {
    const payload: TokenPayloadDto = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }
}
