import { Component } from "@angular/core";
import { FieldType } from "../templates/field.type";

@Component({
  selector: "formly-field-ng-select-header",
  template: `
    <ng-select
      [bindValue]="'value'"
      [items]="to.options | dynamicformSelectOptions: field | async"
      [formControl]="formControl"
    >
      <ng-template ng-header-tmp>
        <a href="javascript:void(0)" (click)="selectAll()" class="text-primary">
          Select all
        </a>
      </ng-template>
    </ng-select>
  `,
  styleUrls: ["./ng-select.type.component.scss"],
})
export class DynamicFormNgSelectHeader extends FieldType {
  constructor() {
    super();
  }

  selectAll() {
    alert("select All in header is clicked");
  }
}
