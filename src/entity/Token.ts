import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { User } from "./User";

@Entity()
export class Token {
  
  @PrimaryColumn()
  id: string;

  @Column()
  expires: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
