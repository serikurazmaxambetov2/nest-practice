import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatContextEntity } from 'src/database/entities/chat-context.entity';
import { ContextService } from 'src/services/context.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatContextEntity])],
  providers: [ContextService],
  exports: [ContextService],
})
export class ContextModule {}
