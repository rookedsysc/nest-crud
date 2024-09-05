import { ApiProperty } from '@nestjs/swagger';
import { CommentResp } from 'src/typeorm/comment/dto/comment-resp.dto';

export class BoardResp {
  @ApiProperty({ description: 'Board ID' })
  id: number;
  @ApiProperty({ description: '제목' })
  title: string;
  @ApiProperty({ description: '본문 내용' })
  content: string;
  @ApiProperty({ description: '댓글 목록' })
  comments: CommentResp[];

  constructor(
    id: number,
    title: string,
    content: string,
    comments: CommentResp[],
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.comments = comments;
  }
}
