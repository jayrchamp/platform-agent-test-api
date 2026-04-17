import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from './mikro-orm.config';
import { PostModule } from './post/post.module';

@Module({
  imports: [MikroOrmModule.forRoot(config), PostModule],
})
export class AppModule {}
