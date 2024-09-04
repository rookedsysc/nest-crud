import { ApiProperty } from '@nestjs/swagger';

export class BoardReq {
  @ApiProperty({ description: '제목을 입력해주세요.' })
  title: string;
  @ApiProperty({ description: '본문 내용을 입력해주세요.' })
  content: string;
}
