import { Component } from "@angular/core";
import { FieldType } from "../templates/field.type";

@Component({
  selector: "formly-field-ng-select",
  template: `
    <ng-select
      [bindValue]="'value'"
      [items]="to.options | dynamicformSelectOptions: field | async"
      [formControl]="formControl"
    >
    </ng-select>
  `,
  styleUrls: ["./ng-select.type.component.scss"],
})
export class DynamicFormNgSelect extends FieldType {}
