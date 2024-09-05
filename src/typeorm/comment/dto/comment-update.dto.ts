import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CommentReq } from './comment-req.dto';

export class CommentUpdateReq extends PartialType(CommentReq) {
  @ApiProperty({ description: 'The title of the comment', required: false })
  title?: string;

  @ApiProperty({ description: 'The content of the comment', required: false })
  content?: string;
}
