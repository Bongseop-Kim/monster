import { Post } from 'src/posts/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  mobile: string;

  @Column()
  gender: string;

  @Column({ name: 'membership_date' })
  membershipDate: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
