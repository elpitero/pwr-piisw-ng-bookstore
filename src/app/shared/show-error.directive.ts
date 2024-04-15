import {Directive, Input, OnDestroy, OnInit, Optional, Self} from '@angular/core';
import {NgControl} from "@angular/forms";
import {Subscription} from "rxjs";

@Directive({
  selector: 'input[showError], textarea[showError], select[showError]',
  standalone: true
})
export class ShowErrorDirective implements OnInit, OnDestroy{

  @Input() controlName?: string;

  public showError: Boolean = false;
  private subscription?: Subscription;
  constructor(@Optional() @Self() public ngControl: NgControl) {}

  ngOnInit() {
    this.subscription = this.ngControl.statusChanges?.subscribe( (status) => {
      this.showError = status == 'INVALID';
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
