import { PickType } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

export class LoginRequestDto extends PickType(User, [
  'mobile',
  'password',
] as const) {}
