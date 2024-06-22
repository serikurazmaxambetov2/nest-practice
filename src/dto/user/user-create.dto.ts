import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import UserLoginDto from './user-login.dto';

export default class UserCreateDto extends UserLoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Имя пользователя не должно быть пустым' })
  name: string;
}
