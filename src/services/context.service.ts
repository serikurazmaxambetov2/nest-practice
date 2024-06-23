import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatContextEntity } from 'src/database/entities/chat-context.entity';
import { GptMessageDto } from 'src/dto/gpt/gpt-message.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ContextService {
  constructor(
    @InjectRepository(ChatContextEntity)
    private readonly chatContextRepository: Repository<ChatContextEntity>,
  ) {}

  async findContextById(contextId: string) {
    const context = await this.chatContextRepository.findOne({
      where: { id: contextId },
    });
    if (!context) {
      return null;
    }
    return context;
  }

  async saveContext(context: ChatContextEntity) {
    return await this.chatContextRepository.save(context);
  }

  async createContext(messages: GptMessageDto[]) {
    return await this.chatContextRepository.save({ messages });
  }

  addMessageToContext(
    context: ChatContextEntity,
    message: GptMessageDto,
  ): void {
    context.messages.push(message);
  }
}
