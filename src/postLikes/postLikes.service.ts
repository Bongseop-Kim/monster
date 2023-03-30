import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from 'src/posts/post.repository';
import { UserRepository } from 'src/users/user.repository';
import { Repository } from 'typeorm';
import { PostLikes } from './postLikes.entity';

@Injectable()
export class PostLikesService {
  constructor(
    @InjectRepository(PostLikes)
    private readonly postLikeRepository: Repository<PostLikes>,
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createPostLikes(postId: number, userId: number): Promise<PostLikes> {
    const user = await this.userRepository.findUserByIdWithoutPassword(userId);
    const post = await this.postRepository.findPostById(postId);
    const postLikes = new PostLikes();
    postLikes.post = post;
    postLikes.liker = user;

    const newPostLike = await this.postLikeRepository.save(postLikes);
    return newPostLike;
  }

  async deletePostLikes(postLikesId: number) {
    await this.postLikeRepository.delete(postLikesId);
  }
}
