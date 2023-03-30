import { User } from 'src/users/user.entity';

export class PostReqDto {
  title: string;
  content: string;
  imgFile: string;
  author: User;
}
