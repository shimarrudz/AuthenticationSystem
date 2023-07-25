import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "customPassword", async: false })
export class CustomPasswordValidator implements ValidatorConstraintInterface {
  validate(password: string) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  defaultMessage() {
    return "Password must contain at least one uppercase letter, one lowercase letter, one special character, and have a minimum length of 8 characters";
  }
}

export function IsCustomPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isCustomPassword",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CustomPasswordValidator,
    });
  };
}
