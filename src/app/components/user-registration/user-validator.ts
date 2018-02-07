import { AbstractControl, ValidatorFn } from "@angular/forms"

export function userValidator(control: AbstractControl): { [key: string]: any } {
  let nameRegex = /[а-я]/i;
  let value = control.value;

  let result = !nameRegex.test(value);

  if (result || (value === '')) {
    return null;
  } else {
    return { "userValidator": {value} }
  }
}


