import {
  Component,
  ChangeDetectionStrategy,
  DoCheck,
  OnChanges,
  Input,
  SimpleChanges,
  EventEmitter,
  Output,
  OnDestroy,
  NgZone,
} from "@angular/core";
import { FormGroup, FormArray } from "@angular/forms";
import {
  DynamicFieldConfig,
  DynamicFormOptions,
  DynamicFieldConfigCache,
} from "../models";
import { DynamicFormBuilder } from "../services/dynamicform.builder";
import { DynamicConfig } from "../services/dynamicform.config";
import { clone } from "../utils";
import { switchMap, filter, take } from "rxjs/operators";
import { clearControl } from "../extensions/field-form/utils";

@Component({
  selector: "dynamic-form",
  template: `
    <dynamicform-field *ngFor="let f of fields" [field]="f"></dynamicform-field>
  `,
  providers: [DynamicFormBuilder],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicForm implements DoCheck, OnChanges, OnDestroy {
  @Input()
  set form(form: FormGroup | FormArray) {
    this.field.form = form;
  }
  get form() {
    return this.field.form as FormGroup | FormArray;
  }

  @Input()
  set model(model: any) {
    this.setField({ model });
  }
  get model() {
    return this.field.model;
  }

  @Input()
  set fields(fieldGroup: DynamicFieldConfig[]) {
    this.setField({ fieldGroup });
  }
  get fields() {
    return this.field.fieldGroup;
  }

  @Input()
  set options(options: DynamicFormOptions) {
    this.setField({ options });
  }
  get options() {
    return this.field.options;
  }

  @Output() modelChange = new EventEmitter<any>();

  private field: DynamicFieldConfigCache = {};
  private _modelChangeValue: any = {};
  private valueChangesUnsubscribe = () => {};

  constructor(
    private builder: DynamicFormBuilder,
    private config: DynamicConfig,
    private ngZone: NgZone
  ) {}

  ngDoCheck() {
    if (this.config.extras.checkExpressionOn === "changeDetectionCheck") {
      this.checkExpressionChange();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fields && this.form) {
      clearControl(this.form);
    }

    if (
      changes.fields ||
      changes.form ||
      (changes.model && this._modelChangeValue !== changes.model.currentValue)
    ) {
      this.valueChangesUnsubscribe();
      this.builder.build(this.field);
      this.valueChangesUnsubscribe = this.valueChanges();
    }
  }

  ngOnDestroy() {
    this.valueChangesUnsubscribe();
  }

  private checkExpressionChange() {
    this.field.options.checkExpressions(this.field);
  }

  private valueChanges() {
    this.valueChangesUnsubscribe();

    const sub = this.field.options.fieldChanges
      .pipe(
        filter(({ type }) => type === "valueChanges"),
        switchMap(() => this.ngZone.onStable.asObservable().pipe(take(1)))
      )
      .subscribe(() =>
        this.ngZone.runGuarded(() => {
          this.checkExpressionChange();
          this.modelChange.emit((this._modelChangeValue = clone(this.model)));
        })
      );

    return () => sub.unsubscribe();
  }

  private setField(field: DynamicFieldConfigCache) {
    this.field = {
      ...this.field,
      ...(this.config.extras.immutable ? clone(field) : field),
    };
  }
}
