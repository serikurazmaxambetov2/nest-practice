import { GptMessageDto } from 'src/dto/gpt/gpt-message.dto';
import { Column, Entity } from 'typeorm';

@Entity()
export class ChatContextEntity {
  @Column({ type: 'uuid', primary: true, generated: 'uuid' })
  id: string;

  @Column({ type: 'jsonb' })
  messages: GptMessageDto[];
}
