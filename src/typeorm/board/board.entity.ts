import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Comment } from '../comment/comment.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Comment, (comment) => comment.board, {
    cascade: true,
    eager: false,
  })
  comments: Promise<Comment[]>;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
