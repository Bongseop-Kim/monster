import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';
import { CommentsService } from './comments.service';

@Controller('comments')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    summary: '댓글 작성하기',
  })
  @Post(':postId/:userId')
  async createPostLikes(
    @Param('postId') postId: number,
    @Param('userId') userId: number,
    @Body() body,
  ) {
    await this.commentsService.createComment(postId, userId, body);
  }

  //해당 게시물의 모든 댓글 가져오기
  @ApiOperation({
    summary: '해당 게시물의 모든 댓글 가져오기',
  })
  @Get(':postId')
  async getAllComment(@Param('postId') postId: number) {
    const comments = await this.commentsService.getAllComment(postId);
    return comments;
  }

  @ApiOperation({
    summary: '댓글 수정하기',
  })
  @Patch(':commentId')
  async updateComment(@Param('commentId') commentId: number, @Body() body) {
    const updatedComment = await this.commentsService.updateComment(
      commentId,
      body,
    );
    return updatedComment;
  }

  @ApiOperation({
    summary: '댓글 삭제하기',
  })
  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: number) {
    await this.commentsService.deleteComment(commentId);
  }
}
