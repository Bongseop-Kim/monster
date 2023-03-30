import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';
import { PostReqDto } from './dto/post.request.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(@Body() data: PostReqDto) {
    const createdPost = await this.postsService.createPost(data);
    return createdPost;
  }

  @Get(':postId')
  async getPostById(@Param('postId') postId: number) {
    const post = await this.postsService.getPostById(postId);
    // 포스트를 조회하면 자동으로 뷰 카운트가 올라 갈 것으 생각하고 조회 후 카운트를 바로 증가 시킵니다.
    await this.postsService.incrementViewCount(postId);
    return post;
  }

  @Put(':postId')
  async updatePostById(@Param('postId') postId: number, data: PostReqDto) {
    await this.postsService.updatePostById(postId, data);
  }

  @Delete(':postId')
  async deletePostById(@Param('postId') postId: number) {
    await this.postsService.deletePostById(postId);
  }

  @Patch(':postId')
  async blockPostById(@Param('postId') postId: number) {
    await this.postsService.blockPostById(postId);
  }
}
