import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/database/data.source';
import AuthModule from './auth.module';
import TokenModule from './token.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UserModule,
    TokenModule,
  ],
})
export class AppModule {}
