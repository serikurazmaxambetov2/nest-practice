import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from 'src/database/entities/user.entity';
import UserCreateDto from 'src/dto/user/user-create.dto';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(userCreateDto: UserCreateDto) {
    return await this.userRepository.save(userCreateDto);
  }

  async findOne(options: FindOneOptions<UserEntity>) {
    return await this.userRepository.findOne(options);
  }
}
