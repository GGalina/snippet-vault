import { Module } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { SnippetController } from './snippet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Snippet, SnippetSchema } from './schemas/snippet.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Snippet.name, schema: SnippetSchema }])],
  controllers: [SnippetController],
  providers: [SnippetService],
})
export class SnippetModule {}
