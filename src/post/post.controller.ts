import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postService.findOne(id);
    if (!post) throw new NotFoundException(`Post #${id} not found`);
    return post;
  }

  @Post()
  create(@Body() body: { title: string; content: string }) {
    return this.postService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { title?: string; content?: string }
  ) {
    const post = await this.postService.update(id, body);
    if (!post) throw new NotFoundException(`Post #${id} not found`);
    return post;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.postService.remove(id);
    if (!deleted) throw new NotFoundException(`Post #${id} not found`);
    return { deleted: true };
  }
}
