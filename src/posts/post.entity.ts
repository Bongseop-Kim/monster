import { Comment } from 'src/comments/comment.entity';
import { PostLikes } from 'src/postLikes/postLikes.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  imgFile: string;

  @Column({ default: 0 })
  viewCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  author: User;

  @OneToMany(() => PostLikes, (postLikes) => postLikes.post, {
    nullable: true,
  })
  likes: PostLikes[];

  @OneToMany(() => Comment, (comment) => comment.post, {
    nullable: true,
  })
  commetns: Comment[];

  @Column({ default: false })
  blocked: boolean;
}
