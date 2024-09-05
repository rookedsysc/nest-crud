import { ApiProperty } from "@nestjs/swagger";

export class BoardDzResp {
  @ApiProperty({ description: 'Board ID' })
  id: number;
  @ApiProperty({ description: '제목' })
  title: string;
  @ApiProperty({ description: '본문 내용' })
  content: string;
  @ApiProperty({ description: '생성된 시간' })
  createdAt: Date;

  constructor(id: number, title: string, content: string, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }
}