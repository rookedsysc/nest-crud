import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../board/board.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Board, (board) => board.comments, {
    eager: true,
  })
  // @JoinColumn([{ name: 'board_id', referencedColumnName: 'board_id' }])
  board: Board;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  constructor(title: string, content: string, board: Board) {
    this.title = title;
    this.content = content;
    this.board = board;
  }
}
