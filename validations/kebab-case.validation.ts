import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'kebabCase', async: false })
export class IsKebabCaseConstraint implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    // Check if the text is in kebab case (lowercase words separated by dashes)
    return /^[a-z]+(-[a-z]+)*$/.test(text) && !/^-|-$/.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be in kebab case (e.g., "section-name")`;
  }
}
