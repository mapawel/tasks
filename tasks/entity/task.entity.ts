import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../../tasks/status/task-status.enum';
import { User } from '../../users/entity/user.entity';

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
  createdAt: Date;

  @Column({ nullable: true })
  updatedBy: number;

  @Column({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
