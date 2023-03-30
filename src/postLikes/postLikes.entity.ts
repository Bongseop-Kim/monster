import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class PostLikes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.likes)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: Post;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  liker: User;
}
