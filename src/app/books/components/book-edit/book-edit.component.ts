import { Component } from '@angular/core';
import {Book} from "../../model/book";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BooksService} from "../../services/books.service";
import {ShowErrorDirective} from "../../../shared/show-error.directive";
import {FormFieldComponent} from "../../../shared/form-field/form-field.component";

@Component({
  selector: 'bs-book-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ShowErrorDirective,
    FormFieldComponent
  ],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.scss'
})
export class BookEditComponent {
  readonly book: Book;
  readonly bookForm: FormGroup;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private bookService: BooksService,
    private router: Router
  ) {
    this.book = this.activatedRoute.snapshot.data['book'];

    this.bookForm = this.formBuilder.group({
      bookTitle: [this.book.title, [Validators.required, Validators.maxLength(50)]],
      author: [this.book.author, [Validators.required, Validators.maxLength(50)]],
      year: [this.book.year, [Validators.required, Validators.min(1000), Validators.max(2023), Validators.pattern('^\\d+$')]],
      description: [this.book.description, [Validators.maxLength(1000)]]
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formValue = this.bookForm.value;

      const updatedBook: Book = {
        id: this.book.id,
        title: formValue.bookTitle,
        author: formValue.author,
        year: formValue.year,
        description: formValue.description
      };

      this.bookService.saveBook(updatedBook).subscribe({
        next: () => {
          this.router.navigate(['/books']).then(() => {})
        }
      });
    }
  }

  get isSubmitDisabled(){
    return !this.hasChanged() || !this.bookForm.valid
  }
  private hasChanged(): Boolean {
    const v = this.bookForm.value;
    const b = this.book;
    return (v.bookTitle != b.title) || (v.author != b.author) || (v.year != b.year) || (v.description != b.description);
  }
  onCancel() {
    this.router.navigate(['/books']);
  }
}
