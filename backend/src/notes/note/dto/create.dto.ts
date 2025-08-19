import { IsNotEmpty, IsOptional, MaxLength, Validate } from 'class-validator';
import { IsMarkdownConstraint } from 'src/notes/validators/is-markdown.validator';

export class CreateNoteDto {
    @IsOptional()
    @MaxLength(100)
    title: string;

    @IsNotEmpty()
    @Validate(IsMarkdownConstraint)
    content: string;
}
  