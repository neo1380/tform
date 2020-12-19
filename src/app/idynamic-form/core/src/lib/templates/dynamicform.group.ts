import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FieldType } from "./field.type";

@Component({
  selector: "dynamicform-group",
  template: `
    <dynamicform-field
      *ngFor="let f of field.fieldGroup"
      [field]="f"
    ></dynamicform-field>
    <ng-content></ng-content>
  `,
  host: {
    "[class]": 'field.fieldGroupClassName || ""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicGroup extends FieldType {}
