import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FieldWrapper } from "../../../../../idynamic-form/core/src/lib/core";

@Component({
  selector: "dynamicform-wrapper-form-field",
  template: `
    <div class="form-group" [class.has-error]="showError">
      <label *ngIf="to.label && to.hideLabel !== true" [attr.for]="id">
        {{ to.label }}
        <span *ngIf="to.required && to.hideRequiredMarker !== true">*</span>
      </label>

      <ng-template #fieldComponent></ng-template>

      <div *ngIf="showError" class="invalid-feedback" [style.display]="'block'">
        <dynamicform-validation-message
          [field]="field"
        ></dynamicform-validation-message>
      </div>

      <small *ngIf="to.description" class="form-text text-muted">{{
        to.description
      }}</small>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicWrapperFormField extends FieldWrapper {}
