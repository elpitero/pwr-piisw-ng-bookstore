import { Injectable } from '@angular/core';
import {ERROR_MESSAGES, ErrorTypes} from "./error-types";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() {}

  getErrorValidationMessage(
    formControlName: string,
    errors: [string, any][]
  ): string {
    console.log(errors);
    const transformedErrors = errors.map(([key, value]) => {
      switch (key) {
        case 'required': return ERROR_MESSAGES['required'](formControlName);
        case 'minlength': return ERROR_MESSAGES['minlength'](formControlName, value.requiredLength);
        case 'maxlength': return ERROR_MESSAGES['maxlength'](formControlName, value.requiredLength);
        case 'min': return ERROR_MESSAGES['min'](formControlName, value.min);
        case 'max': return ERROR_MESSAGES['max'](formControlName, value.max);
        case 'pattern': return ERROR_MESSAGES['pattern'](formControlName)
        default: return '';
      }
    });
    return transformedErrors.join("\n");
  }
}
