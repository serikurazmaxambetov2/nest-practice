import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from './base';
import QuestionEntity from './question.entity';

@Entity()
export default class TopicEntity extends BaseEntity {
  @Column({ type: 'smallint' })
  index: number;

  @Column()
  name: string;

  @OneToMany(() => QuestionEntity, (question) => question.topic)
  questions: QuestionEntity[];
}
