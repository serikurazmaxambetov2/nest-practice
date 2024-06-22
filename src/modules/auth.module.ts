import { Module } from '@nestjs/common';
import AuthController from 'src/controllers/auth.controller';
import AuthService from 'src/services/auth.service';
import TokenModule from './token.module';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export default class AuthModule {}
