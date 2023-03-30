import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/user.repository';
import { PostReqDto } from './dto/post.request.dto';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createPost(data: PostReqDto): Promise<Post> {
    const { title, content, imgFile, author } = data;
    const user = await this.userRepository.findUserByIdWithoutPassword(
      author.id,
    );
    const post = new Post();
    post.title = title;
    post.content = content;
    post.imgFile = imgFile;
    post.author = user;

    const newPost = await this.postRepository.save(post);
    return newPost;
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postRepository.findPostById(id);
    if (!post) {
      throw new UnauthorizedException('해당 게시물은 없습니다.');
    }
    return post;
  }

  async deletePostById(postId: number) {
    await this.postRepository.delete(postId);
  }

  async updatePostById(postId: number, data: PostReqDto): Promise<Post> {
    const { title, content, imgFile } = data;
    const post = await this.postRepository.findPostById(postId);
    post.title = title;
    post.content = content;
    post.imgFile = imgFile;

    const updatedPost = await this.postRepository.save(post);
    return updatedPost;
  }

  async incrementViewCount(postId: number): Promise<void> {
    await this.postRepository.increment({ id: postId }, 'viewCount', 1);
  }

  async blockPostById(postId: number): Promise<void> {
    await this.postRepository.update({ id: postId }, { blocked: true });
  }
}
