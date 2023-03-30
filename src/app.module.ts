import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { PostLikesModule } from './postLikes/postLikes.module';
import { Comment } from './comments/comment.entity';
import { PostLikes } from './postLikes/postLikes.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [User, Post, Comment, PostLikes],
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
    AuthModule,
    PostLikesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
