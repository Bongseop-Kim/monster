import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

export class PostRepository extends Repository<Post> {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {
    super(
      postRepository.target,
      postRepository.manager,
      postRepository.queryRunner,
    );
  }

  async findPostById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: {
        id: id,
      },
    });

    return post;
  }
}
