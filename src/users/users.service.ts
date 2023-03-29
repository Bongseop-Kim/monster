import { Injectable, UnauthorizedException } from '@nestjs/common';
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
      throw new UnauthorizedException('해당하는 유저는 이미 존재합니다.');
    }

    const hashedPassedword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.save({
      name,
      mobile,
      gender,
      password: hashedPassedword,
    });
    return user.readOnlyData;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // async getCurrentUser() {}
}
