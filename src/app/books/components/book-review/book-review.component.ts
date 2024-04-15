import {Component, Input} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Review} from "../../model/review";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'bs-book-review',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './book-review.component.html',
  styleUrl: './book-review.component.scss'
})
export class BookReviewComponent {
  @Input() review?: Review = undefined;
  constructor() {}

  protected readonly undefined = undefined;
}
