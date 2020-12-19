import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FieldType } from "../../../../../idynamic-form/core/src/lib/core";

@Component({
  selector: "formly-field-input",
  template: `
    <input
      *ngIf="type !== 'number'; else numberTmp"
      [type]="type"
      [formControl]="formControl"
      class="form-control"
      [formlyAttributes]="field"
      [class.is-invalid]="showError"
    />
    <ng-template #numberTmp>
      <input
        type="number"
        [formControl]="formControl"
        class="form-control"
        [formlyAttributes]="field"
        [class.is-invalid]="showError"
      />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFieldInput extends FieldType {
  get type() {
    return this.to.type || "text";
  }
}
