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
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';
import { CommentsService } from './comments.service';

@Controller('comments')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':postId/:userId')
  async createPostLikes(
    @Param('postId') postId: number,
    @Param('userId') userId: number,
    @Body() body,
  ) {
    await this.commentsService.createComment(postId, userId, body);
  }

  //해당 게시물의 모든 댓글 가져오기
  @Get(':postId')
  async getAllComment(@Param('postId') postId: number) {
    const comments = await this.commentsService.getAllComment(postId);
    return comments;
  }

  @Patch(':commentId')
  async updateComment(@Param('commentId') commentId: number, @Body() body) {
    const updatedComment = await this.commentsService.updateComment(
      commentId,
      body,
    );
    return updatedComment;
  }

  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: number) {
    await this.commentsService.deleteComment(commentId);
  }
}
