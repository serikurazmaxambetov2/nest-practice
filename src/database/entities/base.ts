import { Column, Entity } from 'typeorm';

@Entity()
export default class BaseEntity {
  @Column({ type: 'uuid', primary: true, generated: 'uuid' })
  id: string;
}
