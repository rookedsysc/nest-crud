import { ApiProperty } from '@nestjs/swagger';

export class CommentResp {
  @ApiProperty({ description: 'Comment ID' })
  id: number;
  @ApiProperty({ description: '제목' })
  title: string;
  @ApiProperty({ description: '내용' })
  content: string;
  @ApiProperty({ description: '생성 시간' })
  createdAt: Date;

  constructor(id: number, title: string, content: string, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }
}
