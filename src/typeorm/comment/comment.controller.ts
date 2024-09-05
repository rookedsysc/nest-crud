import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentReq } from './dto/comment-req.dto';

@ApiTags('Comment')
@Controller('/api')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/boards/:boardId/comments')
  @ApiOperation({ summary: 'Create a new comment' })
  async createComment(
    @Body() commentReq: CommentReq,
    @Param('boardId') boardId: number,
  ) {
    await this.commentService.createComment(commentReq, boardId);
  }

  @Patch('/comments/:id')
  @ApiOperation({ summary: 'Update a comment by ID' })
  async updateComment(@Param('id') id: number, @Body() commentReq: CommentReq) {
    await this.commentService.updateComment(id, commentReq);
  }

  @Get('/boards/:boardId/comments')
  @ApiOperation({ summary: 'Get all comments by board ID' })
  async getCommentsByBoardId(
    @Param('boardId') boardId: number,
  ): Promise<Array<CommentReq>> {
    return await this.commentService.findCommentsByBoardIdOrThrow(boardId);
  }

  @Delete('/comments/:id')
  @ApiOperation({ summary: 'Delete a comment by ID' })
  async deleteCommentById(@Param('id') id: number) {
    await this.commentService.deleteCommentByIdOrThrow(id);
  }
}
