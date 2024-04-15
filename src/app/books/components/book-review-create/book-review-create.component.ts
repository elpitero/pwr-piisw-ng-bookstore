import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Review} from "../../model/review";
import {BooksService} from "../../services/books.service";
import {FormFieldComponent} from "../../../shared/form-field/form-field.component";
import {ShowErrorDirective} from "../../../shared/show-error.directive";

@Component({
  selector: 'bs-book-review-create',
  standalone: true,
  imports: [
    FormFieldComponent,
    FormsModule,
    ReactiveFormsModule,
    ShowErrorDirective
  ],
  templateUrl: './book-review-create.component.html',
  styleUrl: './book-review-create.component.scss'
})
export class BookReviewCreateComponent {
  @Input() bookId: number = -1;
  @Output() reviewSavedEvent = new EventEmitter<any>();
  @Output() reviewEditCancelEvent = new EventEmitter<any>();

  readonly reviewForm: FormGroup;
  private newId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BooksService
  ) {
    this.reviewForm = this.formBuilder.group({
      reviewTitle: ['', Validators.required],
      reviewRate: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      reviewDescription: ['']
    })
    this.bookService.getNewReviewId().then((newId) => {this.newId = newId;});
  }

  private cleanForm() {
    this.reviewForm.reset();
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      const formValue = this.reviewForm.value;


      const review: Review = {
        id: this.newId,
        forBook: this.bookId,
        title: formValue.reviewTitle,
        description: formValue.reviewDescription,
        rate: formValue.reviewRate
      };
      this.cleanForm();
      this.bookService.saveReview(review)
        .subscribe({next: () => {
          this.reviewSavedEvent.emit(null);
        }});
    }
  }

  get isSubmitDisabled(){
    return !this.reviewForm.valid;
  }

  onCancel() {
    this.cleanForm();
    this.reviewEditCancelEvent.emit(null);
  }

}
