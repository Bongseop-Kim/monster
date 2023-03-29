import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'secret',
      database: 'local-db',
      entities: [User, Post],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
