import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';

export default class UserLoginDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Некорректный email' })
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  email: string;

  @ApiProperty()
  @Length(8, 20, { message: 'Длина пароли от 8 до 20 символов' })
  password: string;
}
