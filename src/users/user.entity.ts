import { Post } from 'src/posts/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  mobile: string;

  @Column()
  gender: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  //패스 워드는 필요에 따라 readOnlyData를 만들어 준다.
  readonly readOnlyData: {
    id: number;
    name: string;
    mobile: string;
    gender: string;
    posts: Post[];
  };
}
