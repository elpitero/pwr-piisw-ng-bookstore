import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {BooksService} from "../services/books.service";
import {inject} from "@angular/core";
import {Review} from "../model/review";

export const reviewForBookResolver: ResolveFn<Review[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(BooksService).getAllReviewsForBook(route.paramMap.get('id'));
};
