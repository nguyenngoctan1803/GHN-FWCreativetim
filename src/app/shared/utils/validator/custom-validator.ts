import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom Validator để kiểm tra số lượng phần tử trong FormArray
export function minArrayLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control || !control.value || !Array.isArray(control.value)) {
      return null;
    }
    return control.value.length >= minLength ? null : { minArrayLength: true };
  };
}