import { ApiProperty } from '@nestjs/swagger';

export class BoardResp {
  @ApiProperty({ description: 'Board ID' })
  id: number;
  @ApiProperty({ description: '제목' })
  title: string;
  @ApiProperty({ description: '본문 내용' })
  content: string;
}
