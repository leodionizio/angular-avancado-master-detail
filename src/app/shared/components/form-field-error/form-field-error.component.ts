import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{ errorMessage }}
    </p>
  `,
  styleUrls: ['./form-field-error.component.scss'],
})
export class FormFieldErrorComponent implements OnInit {
  @Input('form-control') formControl: FormControl;

  constructor() {}

  ngOnInit(): void {}

  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) {
      return this.getErrorMessage();
    }

    return null;
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors.required) {
      return 'Este campo é obrigatório';
    }

    else if (this.formControl.errors.email) {
      return 'E-mail no formato inválido';
    }

    else if (this.formControl.errors.minlength) {
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `Este campo deve ter pelo menos ${requiredLength} caracteres`;
    }
  }
}
