import { Task } from "../../tasks/entity/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string; // WYŁACZNIE NA POTRZEBY TEGO ZADANIA DOPUSZCZAM TRZYMANIE CZYSTEGO HASŁA! OCZYWIŚCIE TU MUSI BYĆ HASH ALE NIE MA TU IMPLEMENTACJI SIGNON I TWORZENIA USER ENTITY WIĘC NIE WDRAŻAM HASHOWANIA!!!

  @Column()
  createdAt: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
