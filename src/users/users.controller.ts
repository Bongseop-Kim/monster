import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';
import { UserRequestDto } from './dto/user.request.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: '회원가입',
  })
  @Post('signup')
  async sighUp(@Body() body: UserRequestDto) {
    return await this.usersService.signUp(body);
  }

  @ApiOperation({
    summary: '로그인',
  })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  //회원정보는 jwt로 받습니다.
  @ApiOperation({
    summary: '현재 고양이 가져오기',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getCurrentUser(@CurrentUser() user) {
    return user;
  }
  @ApiOperation({
    summary: '회원 차단 하기',
  })
  @Patch(':userId')
  async blockPostById(@Param('userId') userId: number) {
    await this.usersService.blockUserById(userId);
  }
}
