import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async save(data) {
    const user = await this.userRepository.save(data);
    return user;
  }

  async findUserByPhoneNum(data: string) {
    const user = await this.userRepository.findOne({
      where: {
        mobile: data,
      },
    });
    return user;
  }

  async findUserByIdWithoutPassword(userId: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    return user;
  }
}
