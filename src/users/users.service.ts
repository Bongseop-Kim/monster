import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRequestDto } from './dto/user.request.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(body: UserRequestDto) {
    const { name, mobile, gender, password } = body;
    const isUserExist = await this.userRepository.findUserByPhoneNum(mobile);

    if (isUserExist) {
      throw new UnauthorizedException('해당하는 유저는 이미 존재합니다.');
    }

    const hashedPassedword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.save({
      name,
      mobile,
      gender,
      password: hashedPassedword,
    });
    return user;
  }

  async blockUserById(userId: number): Promise<void> {
    await this.userRepository.update({ id: userId }, { blocked: true });
  }
}
