import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Snippet, SnippetDocument } from './schemas/snippet.schema';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Injectable()
export class SnippetService {
  constructor(
    @InjectModel(Snippet.name)
    private snippetModel: Model<SnippetDocument>,
  ) {}

  // Create a new snippet
  async create(createSnippetDto: CreateSnippetDto) {
    const { title, type, tags } = createSnippetDto;

    // 400 validations for create
    if (!title || !title.trim()) {
      throw new BadRequestException('Title cannot be empty');
    }

    if (!['link', 'note', 'command'].includes(type)) {
      throw new BadRequestException('Type must be link, note, or command');
    }

    if (!Array.isArray(tags)) {
      throw new BadRequestException('Tags must be an array');
    }

    const snippet = new this.snippetModel(createSnippetDto);
    return snippet.save();
  }

  // Get all snippets with pagination, search, and filter
  async findAll(page = 1, limit = 10, q?: string, tag?: string) {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Page and limit must be positive numbers');
    }

    const filter: any = {};

    if (q) {
      filter.$text = { $search: q };
    }

    if (tag) {
      filter.tags = tag;
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.snippetModel.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      this.snippetModel.countDocuments(filter),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  // Get a single snippet by ID
  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid snippet ID');
    }

    const snippet = await this.snippetModel.findById(id);

    if (!snippet) {
      throw new NotFoundException('Snippet not found');
    }

    return snippet;
  }

  // Update a snippet by ID
  async update(id: string, updateSnippetDto: UpdateSnippetDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid snippet ID');
    }

    // Validate type
    if (updateSnippetDto.type && !['link', 'note', 'command'].includes(updateSnippetDto.type)) {
      throw new BadRequestException('Type must be link, note, or command');
    }

    // Validate tags
    if (updateSnippetDto.tags && !Array.isArray(updateSnippetDto.tags)) {
      throw new BadRequestException('Tags must be an array');
    }

    const snippet = await this.snippetModel.findByIdAndUpdate(id, updateSnippetDto, {
      returnDocument: 'after',
    });

    if (!snippet) {
      throw new NotFoundException('Snippet not found');
    }

    return snippet;
  }

  // Delete a snippet by ID
  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid snippet ID');
    }

    const snippet = await this.snippetModel.findByIdAndDelete(id);

    if (!snippet) {
      throw new NotFoundException('Snippet not found');
    }

    return { message: 'Snippet deleted successfully' };
  }
}
