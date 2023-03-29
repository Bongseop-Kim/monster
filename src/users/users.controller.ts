import { Body, Controller, Post } from '@nestjs/common';
import { UserRequestDto } from './dto/user.request.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async sighUp(@Body() body: UserRequestDto) {
    return await this.usersService.signUp(body);
  }
}
