import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';
import { PostLikesService } from './postLikes.service';

@Controller('postLikes')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class PostLikesController {
  constructor(private readonly postLikesService: PostLikesService) {}

  @ApiOperation({
    summary: '좋아요 누르기',
  })
  @Post(':postId/:userId')
  async createPostLikes(@Param('postId') postId, @Param('userId') userId) {
    await this.postLikesService.createPostLikes(postId, userId);
  }

  @ApiOperation({
    summary: '해당 유저가 해당 게시판 좋아요 데이터 가지고 있는지 확인하기',
  })
  @Get(':postId/:userId')
  async getCurrentUserLikes(
    @Param('postId') postId: number,
    @Param('userId') userId,
  ) {
    const postLike = await this.postLikesService.getCurrentUserLikes(
      postId,
      userId,
    );
    return postLike;
  }

  @ApiOperation({
    summary: '좋아요 취소하기',
  })
  @Delete(':postLikesId')
  async deletePostLikes(@Param('postLikesId') postLikesId) {
    await this.postLikesService.deletePostLikes(postLikesId);
  }
}
