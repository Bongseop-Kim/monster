import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';
import { Comment } from './comment.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), PostsModule, UsersModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
