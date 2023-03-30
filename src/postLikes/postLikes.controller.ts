import {
  Controller,
  Delete,
  Get,
  Param,
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

  @Get(':postId/:userId')
  async createPostLikes(@Param('postId') postId, @Param('userId') userId) {
    await this.postLikesService.createPostLikes(postId, userId);
  }

  @Delete(':postLikesId')
  async deletePostLikes(@Param('postLikesId') postLikesId) {
    await this.postLikesService.deletePostLikes(postLikesId);
  }
}
