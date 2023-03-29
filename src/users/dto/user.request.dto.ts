import { PickType } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UserRequestDto extends PickType(User, [
  'name',
  'mobile',
  'gender',
  'password',
] as const) {}
