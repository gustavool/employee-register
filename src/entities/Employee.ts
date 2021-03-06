import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('employee')
class Employee {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  position: string;

  @Column()
  email: string;

  @Column()
  location: string;

  @Column()
  department: string;

  @Column({ type: 'date' })
  hiring_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Employee };
