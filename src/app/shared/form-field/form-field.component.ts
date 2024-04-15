import {Component, ContentChild, OnInit} from '@angular/core';
import {ShowErrorDirective} from "../show-error.directive";
import {ErrorService} from "../error.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'bs-form-field',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent implements OnInit {
  @ContentChild(ShowErrorDirective, { static: true }) errorDirective!: ShowErrorDirective;

  constructor(private errorService: ErrorService) {}

  get showError(): Boolean {
    return this.errorDirective.showError;
  }

  get errorMessage(): string | null {
    const errors = Object.entries(
      this.errorDirective?.ngControl?.control?.errors || {}
    );

    if (!this.errorDirective?.ngControl?.dirty && !this.errorDirective?.ngControl?.touched) return '';
    if (!errors.length) { return null;}

    const passedControlName = this.errorDirective?.controlName;
    const formControlName = passedControlName ?? 'This field';
    return this.errorService.getErrorValidationMessage(formControlName, errors);
  }

  ngOnInit() {
    if (!this.errorDirective) {
      throw new Error('Without showError directive this is a useless component!');
    }
  }
}
