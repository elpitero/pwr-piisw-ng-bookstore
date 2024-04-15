import { Component } from '@angular/core';
import {Book} from "../../model/book";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {BookReviewComponent} from "../book-review/book-review.component";
import {Review} from "../../model/review";
import {BooksService} from "../../services/books.service";
import {NgForOf, NgIf} from "@angular/common";
import {BookReviewCreateComponent} from "../book-review-create/book-review-create.component";

@Component({
  selector: 'bs-book-details',
  standalone: true,
  imports: [
    RouterLink,
    BookReviewComponent,
    NgForOf,
    NgIf,
    BookReviewCreateComponent
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  readonly book: Book;
  reviews: Review[] = [];

  public showAddReviewForm = false;
  toggleAddReviewFormVisibility() {
    this.showAddReviewForm = !this.showAddReviewForm;
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly bookService: BooksService
  ) {
    this.book = this.activatedRoute.snapshot.data['book'];
    this.fetchReviews();
  }

  private fetchReviews() {
    this.bookService.getAllReviewsForBook(this.book.id).forEach(
      (reviews) => {this.reviews = reviews;}
    );
  }

  refreshData() {
    this.showAddReviewForm = false;
    this.fetchReviews();
  }
}
