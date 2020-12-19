import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormlyModule } from "../../../../../idynamic-form/core/src/lib/core";
import { ReactiveFormsModule } from "@angular/forms";

import { FormlyBootstrapFormFieldModule } from "../../form-field";

import { FormlyFieldCheckbox } from "./checkbox.type";

@NgModule({
  declarations: [FormlyFieldCheckbox],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyBootstrapFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: "checkbox",
          component: FormlyFieldCheckbox,
          wrappers: ["form-field"],
        },
        {
          name: "boolean",
          extends: "checkbox",
        },
      ],
    }),
  ],
  entryComponents: [FormlyFieldCheckbox],
})
export class FormlyBootstrapCheckboxModule {}
