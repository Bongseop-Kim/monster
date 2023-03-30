import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';
import { PostLikesService } from './postLikes.service';

@Controller('postLikes')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class PostLikesController {
  constructor(private readonly postLikesService: PostLikesService) {}

  @Post(':postId/:userId')
  async createPostLikes(@Param('postId') postId, @Param('userId') userId) {
    await this.postLikesService.createPostLikes(postId, userId);
  }

  //해당 휴저가 해당 게시판의 좋아요를 눌렀는지 확인하는 로직
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

  @Delete(':postLikesId')
  async deletePostLikes(@Param('postLikesId') postLikesId) {
    await this.postLikesService.deletePostLikes(postLikesId);
  }
}
