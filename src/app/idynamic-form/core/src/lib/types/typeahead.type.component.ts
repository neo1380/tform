import { Component, EventEmitter, OnDestroy } from "@angular/core";
import { FieldType } from "../core";
import { Subject } from "rxjs";
import {
  takeUntil,
  startWith,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from "rxjs/operators";

@Component({
  selector: "formly-field-typeahead",
  template: `
    <ng-select
      [items]="options$ | async"
      [placeholder]="to.placeholder"
      [typeahead]="search$"
      [formControl]="formControl"
    >
    </ng-select>
  `,
})
export class DynamicFormTypeahead extends FieldType implements OnDestroy {
  onDestroy$ = new Subject<void>();
  search$ = new EventEmitter();
  options$;

  ngOnInit() {
    this.options$ = this.search$.pipe(
      takeUntil(this.onDestroy$),
      startWith(""),
      filter((v) => v !== null),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(this.to.search$)
    );

    this.options$.subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.complete();
  }
}
