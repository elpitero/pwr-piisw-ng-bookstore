import {isFormControl} from "@angular/forms";

export type ErrorTypes =
  | 'required'
  | 'minlength'
  | 'maxlength'
  | 'min'
  | 'max'
  | 'pattern';

export const ERROR_MESSAGES: { [key: string]: (...args: any) => string } = {
  required: (formControlName: string) => `${formControlName} is required.`,
  minlength: (formControlName, requirement) =>
    `${formControlName} should be at least ${requirement} characters.`,
  maxlength: (formControlName, requirement) =>
    `${formControlName} should be at most ${requirement} characters.`,
  min: (formControlName, requirement) =>
    `${formControlName} should be at least ${requirement}`,
  max: (formControlName, requirement) =>
    `${formControlName} should be at most ${requirement}`,
  pattern: (formControlName) =>
    `${formControlName} should be a number`
};
