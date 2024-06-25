import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from './base';
import TopicEntity from './topic.entity';

@Entity()
export default class QuestionEntity extends BaseEntity {
  @ManyToOne(() => TopicEntity, (topic) => topic.questions)
  topic: TopicEntity;

  @Column({ type: 'text', unique: true })
  imageUrl: string;

  @Column({ type: 'varchar', length: 1 })
  answer: 'A' | 'B' | 'C' | 'D';
}
