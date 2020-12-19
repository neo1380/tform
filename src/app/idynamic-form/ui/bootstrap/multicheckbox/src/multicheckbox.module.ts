import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "../../../../../idynamic-form/core/src/lib/core";
import { FormlySelectModule } from "../../../../core/select";
import { FormlyBootstrapFormFieldModule } from "../../form-field";

import { FormlyFieldMultiCheckbox } from "./multicheckbox.type";

@NgModule({
  declarations: [FormlyFieldMultiCheckbox],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FormlyBootstrapFormFieldModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: "multicheckbox",
          component: FormlyFieldMultiCheckbox,
          wrappers: ["form-field"],
        },
      ],
    }),
  ],
})
export class FormlyBootstrapMultiCheckboxModule {}
