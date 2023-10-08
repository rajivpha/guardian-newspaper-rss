import { IsString, IsNotEmpty, Validate } from 'class-validator';
import { IsKebabCaseConstraint } from 'validations/kebab-case.validation';

export class SectionDto {
  @IsNotEmpty()
  @IsString()
  @Validate(IsKebabCaseConstraint, {
    message: 'Section name must be in kebab case (e.g., "section-name")',
  })
  sectionName: string;
}
