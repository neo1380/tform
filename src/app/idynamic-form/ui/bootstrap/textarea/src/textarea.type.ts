import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FieldType } from "../../../../../idynamic-form/core/src/lib/core";

@Component({
  selector: "dynamicform-field-textarea",
  template: `
    <textarea
      [formControl]="formControl"
      [cols]="to.cols"
      [rows]="to.rows"
      class="form-control"
      [class.is-invalid]="showError"
      [dynamicformAttributes]="field"
    >
    </textarea>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFieldTextArea extends FieldType {
  defaultOptions = {
    templateOptions: {
      cols: 1,
      rows: 1,
    },
  };
}
