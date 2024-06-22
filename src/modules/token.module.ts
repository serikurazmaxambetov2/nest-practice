import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import TokenController from 'src/controllers/token.controller';
import TokenService from 'src/services/token.service';

@Module({
  imports: [JwtModule], // Посмотрите в TokenService.
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export default class TokenModule {}
