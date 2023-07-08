import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../../tasks/status/task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  startTime: Date;

  @Column()
  deadline: Date;

  @Column()
  status: TaskStatus;

  @Column()
  createdBy: number;

  @Column()
  createdAy: number;

  @Column()
  updatedBy: number;

  @Column()
  updatedAy: number;
}
