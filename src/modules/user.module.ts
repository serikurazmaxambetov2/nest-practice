import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserController from 'src/controllers/user.controller';
import UserEntity from 'src/database/entities/user.entity';
import UserService from 'src/services/user.service';
import TokenModule from './token.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), TokenModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
