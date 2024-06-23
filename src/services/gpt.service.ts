import { BadRequestException, Injectable } from '@nestjs/common';
import { G4F } from 'g4f';
import { ChatContextEntity } from 'src/database/entities/chat-context.entity';
import { GenerateGptRequestDto } from 'src/dto/gpt/generate-gpt-request.dto';
import { GptMessageDto } from 'src/dto/gpt/gpt-message.dto';
import { ContextService } from './context.service';

@Injectable()
export class GptService {
  private g4f: G4F;

  constructor(private contextService: ContextService) {
    this.g4f = new G4F();
  }

  async generate(generateDto: GenerateGptRequestDto) {
    const { contextId, message } = generateDto;
    let context: ChatContextEntity;
    let messages: GptMessageDto[];

    if (contextId) {
      context = await this.contextService.findContextById(contextId);

      if (!context) {
        throw new BadRequestException('Контекста с таким id не существует');
      }
      messages = context.messages;
    } else {
      messages = [];
    }

    messages.push({ role: 'user', content: message });

    const answer = await this.g4f.chatCompletion(messages);
    messages.push({ role: 'assistant', content: answer });

    if (contextId) {
      await this.contextService.saveContext(context);
      return { contextId, messages };
    } else {
      context = await this.contextService.createContext(messages);
      return { contextId: context.id, messages: context.messages };
    }
  }
}
