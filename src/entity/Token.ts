import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryColumn()
  id: string;
}
