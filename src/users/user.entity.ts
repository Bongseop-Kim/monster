import { Post } from 'src/posts/post.entity';
import { PostLikes } from 'src/postLikes/postLikes.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //select false를 해주면 해당 값은 return 되지 않는다.
  @Column({ select: false })
  password: string;

  @Column({ unique: true })
  mobile: string;

  @Column()
  gender: string;

  @Column({ default: false })
  blocked: boolean;

  //유저가 삭제되도 게시글은 유지 되도록 cascade 설정은 하지 않았다.
  @OneToMany(() => Post, (post) => post.author, { nullable: true })
  posts: Post[];

  @OneToMany(() => PostLikes, (postLikes) => postLikes.liker, {
    nullable: true,
  })
  likes: PostLikes[];

  //패스 워드는 reutrn 안함 readOnlyData를 만들어 준다.
  readonly readOnlyData: {
    id: number;
    name: string;
    mobile: string;
    gender: string;
    posts: Post[];
  };
}
