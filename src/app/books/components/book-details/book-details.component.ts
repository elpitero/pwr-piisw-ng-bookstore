import { Component } from '@angular/core';
import {Book} from "../../model/book";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {BookReviewComponent} from "../book-review/book-review.component";
import {Review} from "../../model/review";
import {BooksService} from "../../services/books.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'bs-book-details',
  standalone: true,
  imports: [
    RouterLink,
    BookReviewComponent,
    NgForOf
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  readonly book: Book;
  reviews: Review[] = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly bookService: BooksService
  ) {
    this.book = this.activatedRoute.snapshot.data['book'];
    this.bookService.getAllReviewsForBook(this.book.id).forEach(
      (reviews) => {this.reviews = reviews;}
    );
  }
}
