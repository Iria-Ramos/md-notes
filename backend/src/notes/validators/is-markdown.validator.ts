import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: false });

@ValidatorConstraint({ name: 'isMarkdown', async: false })
export class IsMarkdownConstraint implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments): boolean {
    return isValidMarkdown(text)
  }

  defaultMessage(args: ValidationArguments) {
    return 'Content does not appear to contain Markdown.';
  }
}

export function isValidMarkdown(contents: string): boolean {
  // Parse into tokens
  const tokens = md.parse(contents, {});

  // If it produced no tokens, definitely invalid/empty
  if (tokens.length === 0) return false;

  // If everything is just text, it might not be "real" markdown
  const hasFormatting = tokens.some(
    (t) => !['inline', 'text'].includes(t.type)
  );

  return hasFormatting;
}
