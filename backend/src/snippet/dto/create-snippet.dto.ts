import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateSnippetDto {
  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  content!: string;

  @IsArray()
  tags!: string[];

  @IsEnum(['link', 'note', 'command'])
  type!: string;
}
