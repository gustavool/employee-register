import {
  Column,
  CreateDateColumn,
  Entity, PrimaryColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('user')
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  location: string;

  @Column({ type: 'date' })
  hiring_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
