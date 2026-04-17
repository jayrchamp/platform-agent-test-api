import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Post[]> {
    return this.em.findAll(Post, { orderBy: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Post | null> {
    return this.em.findOne(Post, id);
  }

  async create(data: { title: string; content: string }): Promise<Post> {
    const post = this.em.create(Post, data);
    await this.em.flush();
    return post;
  }

  async update(
    id: number,
    data: Partial<{ title: string; content: string }>
  ): Promise<Post | null> {
    const post = await this.em.findOne(Post, id);
    if (!post) return null;
    this.em.assign(post, data);
    await this.em.flush();
    return post;
  }

  async remove(id: number): Promise<boolean> {
    const post = await this.em.findOne(Post, id);
    if (!post) return false;
    await this.em.removeAndFlush(post);
    return true;
  }
}
