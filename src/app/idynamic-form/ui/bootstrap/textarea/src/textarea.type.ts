import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FieldType } from "../../../../../idynamic-form/core/src/lib/core";

@Component({
  selector: "formly-field-textarea",
  template: `
    <textarea
      [formControl]="formControl"
      [cols]="to.cols"
      [rows]="to.rows"
      class="form-control"
      [class.is-invalid]="showError"
      [formlyAttributes]="field"
    >
    </textarea>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldTextArea extends FieldType {
  defaultOptions = {
    templateOptions: {
      cols: 1,
      rows: 1,
    },
  };
}
