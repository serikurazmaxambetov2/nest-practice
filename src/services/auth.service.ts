import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import UserCreateDto from 'src/dto/user/user-create.dto';
import UserLoginDto from 'src/dto/user/user-login.dto';
import TokenService from './token.service';
import UserService from './user.service';

@Injectable()
export default class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async register(userCreateDto: UserCreateDto) {
    const userInDb = await this.userService.findOne({
      where: { email: userCreateDto.email },
    });

    if (userInDb) {
      throw new UnauthorizedException(
        'Пользователь с таким email уже существует!',
      );
    }

    const hashedPassword = await bcrypt.hash(userCreateDto.password, 7);

    const createdUser = await this.userService.create({
      ...userCreateDto,
      password: hashedPassword,
    });

    return await this.tokenService.generateTokens(createdUser);
  }

  async login(userLoginDto: UserLoginDto) {
    const userInDb = await this.userService.findOne({
      where: { email: userLoginDto.email },
    });

    if (!userInDb) {
      throw new UnauthorizedException(
        'Пользователя с таким email не существует!',
      );
    }

    const passwordsMatch = await bcrypt.compare(
      userLoginDto.password,
      userInDb.password,
    );

    if (!passwordsMatch) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    return await this.tokenService.generateTokens(userInDb);
  }
}
