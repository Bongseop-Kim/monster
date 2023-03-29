import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createPost(post: Post): Promise<Post> {
    const newPost = await this.postRepository.save(post);
    return newPost;
  }

  async getPosts(): Promise<Post[]> {
    const posts = await this.postRepository.find();
    return posts;
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: {
        id: id,
      },
    });
    return post;
  }

  //   async addComment(postId: number, comment: Comment): Promise<Comment> {
  //     const post = await this.postRepository.findOne(postId);
  //     comment.post = post;
  //     const newComment = await this.commentRepository.save(comment);
  //     return newComment;
  //   }

  //   async incrementViewCount(postId: number): Promise<void> {
  //     await this.postRepository.increment({ id: postId }, 'viewCount', 1);
  //   }

  //   async blockPost(postId: number): Promise<void> {
  //     await this.postRepository.update({ id: postId }, { blocked: true });
  //   }

  //   async writeLike(postId: number): Promise<void> {
  //     await this.postRepository.increment({ id: postId }, 'likeCount', 1);
  //   }
}
