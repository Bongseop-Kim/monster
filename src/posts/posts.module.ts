import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from './post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), forwardRef(() => AuthModule)],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
