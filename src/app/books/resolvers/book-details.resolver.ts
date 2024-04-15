import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {Book} from "../model/book";
import {inject} from "@angular/core";
import {BooksService} from "../services/books.service";

export const bookDetailsResolver: ResolveFn<Book> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const id = route.paramMap.get("bookId");
  return inject(BooksService).findBookById(id);
};
