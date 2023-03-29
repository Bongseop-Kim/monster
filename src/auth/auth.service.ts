import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { mobile, password } = data;

    // 해당 하는 이메일이 있는지 확인
    const user = await this.usersRepository.findUserByPhoneNum(mobile);

    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    // password 일치 여부 확인
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const payload = { mobile: mobile, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
