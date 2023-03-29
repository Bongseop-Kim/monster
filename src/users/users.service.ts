import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRequestDto } from './dto/user.request.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async signUp(body: UserRequestDto) {
    const { name, mobile, gender, password } = body;
    const isUserExist = await this.userRepository.findOne({
      where: {
        mobile: mobile,
      },
    });

    if (isUserExist) {
      //   throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
      // throw new HttpException('해당하는 고양이는 이미 존재합니다.', 403);
    }

    const hashedPassedword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      name,
      mobile,
      gender,
      password: hashedPassedword,
    });
    // 전달해 주고 싶은 데이터만 전달하기 위해 virtual을 이용한 가상의 readOnlyData를 보내준다.
    return user;
  }
}
