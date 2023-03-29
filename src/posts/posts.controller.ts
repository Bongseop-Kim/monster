import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Post as PostModel } from './post.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(@Body() data: PostModel) {
    const createdPost = await this.postsService.createPost(data);
    return createdPost;
  }

  @Get(':id')
  async getPostById(@Param('id') postId: number) {
    const post = await this.postsService.getPostById(postId);
    return post;
  }
}
