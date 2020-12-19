import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormlyModule } from "../../../../../idynamic-form/core/src/lib/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlySelectModule } from "../../../../core/select";

import { FormlyBootstrapFormFieldModule } from "../../form-field";
import { FormlyFieldRadio } from "./radio.type";

@NgModule({
  declarations: [FormlyFieldRadio],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FormlyBootstrapFormFieldModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: "radio",
          component: FormlyFieldRadio,
          wrappers: ["form-field"],
        },
      ],
    }),
  ],
  entryComponents: [FormlyFieldRadio],
})
export class FormlyBootstrapRadioModule {}
