import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Controller('snippets')
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Post() // Create a new snippet
  create(@Body() createSnippetDto: CreateSnippetDto) {
    return this.snippetService.create(createSnippetDto);
  }

  @Get() // Get all snippets with pagination, search, and filter
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('q') q?: string,
    @Query('tag') tag?: string,
  ) {
    return this.snippetService.findAll(Number(page), Number(limit), q, tag);
  }

  @Get(':id') // Get a single snippet by ID
  findOne(@Param('id') id: string) {
    return this.snippetService.findOne(id);
  }

  @Patch(':id') // Update a snippet by ID
  update(@Param('id') id: string, @Body() updateSnippetDto: UpdateSnippetDto) {
    return this.snippetService.update(id, updateSnippetDto);
  }

  @Delete(':id') // Delete a snippet by ID
  remove(@Param('id') id: string) {
    return this.snippetService.remove(id);
  }
}
