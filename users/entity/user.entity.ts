import { Task } from '../../tasks/entity/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  hashpass: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
