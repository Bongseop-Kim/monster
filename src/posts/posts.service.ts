import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/user.repository';
import { Repository } from 'typeorm';
import { PostReqDto } from './dto/post.request.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
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
    const post = await this.postRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!post) {
      throw new UnauthorizedException('해당 게시물은 없습니다.');
    }
    return post;
  }

  async deletePostById(postId: number) {
    // const user = await this.userRepository.findUserByPostIdWithoutPassword(id);
    await this.postRepository.delete(postId);
  }

  async updatePostById(postId: number, data: PostReqDto): Promise<Post> {
    const { title, content, imgFile } = data;
    const post = await this.postRepository.findOne({ where: { id: postId } });
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

  //   async addComment(postId: number, comment: Comment): Promise<Comment> {
  //     const post = await this.postRepository.findOne(postId);
  //     comment.post = post;
  //     const newComment = await this.commentRepository.save(comment);
  //     return newComment;
  //   }

  //   async writeLike(postId: number): Promise<void> {
  //     await this.postRepository.increment({ id: postId }, 'likeCount', 1);
  //   }
}
