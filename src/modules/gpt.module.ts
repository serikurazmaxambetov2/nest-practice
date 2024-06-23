import { Module } from '@nestjs/common';
import { GptController } from 'src/controllers/gpt.controller';
import { GptService } from 'src/services/gpt.service';
import { ContextModule } from './context.module';

@Module({
  imports: [ContextModule],
  controllers: [GptController],
  providers: [GptService],
})
export class GptModule {}
