import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from 'src/posts/post.repository';
import { UserRepository } from 'src/users/user.repository';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentReqDto } from './dto/comment.req.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createComment(
    postId: number,
    userId: number,
    body: CommentReqDto,
  ): Promise<Comment> {
    const user = await this.userRepository.findUserByIdWithoutPassword(userId);
    const post = await this.postRepository.findPostById(postId);
    const comment = new Comment();
    comment.post = post;
    comment.userWhoComment = user;
    comment.content = body.content;

    const newComment = await this.commentRepository.save(comment);
    return newComment;
  }

  async getAllComment(postId: number) {
    const post = await this.commentRepository.findOne({
      where: {
        id: postId,
      },
    });
    const comments = await this.commentRepository.find({
      where: {
        post: post,
      },
    });
    return comments;
  }

  async updateComment(
    commentId: number,
    body: CommentReqDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
    });
    comment.content = body.content;
    const newComment = await this.commentRepository.save(comment);
    return newComment;
  }

  async deleteComment(commentId: number) {
    await this.commentRepository.delete(commentId);
  }
}
