import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';
import { PostLikesController } from './postLikes.controller';
import { PostLikes } from './postLikes.entity';
import { PostLikesService } from './postLikes.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostLikes]), PostsModule, UsersModule],
  controllers: [PostLikesController],
  providers: [PostLikesService],
})
export class PostLikesModule {}
