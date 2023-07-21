import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "customEmail", async: false })
export class CustomEmailValidator implements ValidatorConstraintInterface {
  validate(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  defaultMessage() {
    return "Invalid email format";
  }
}

export function IsCustomEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isCustomEmail",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CustomEmailValidator,
    });
  };
}
