import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "../../../../../idynamic-form/core/src/lib/core";
import { FormlySelectModule } from "../../../../core/select";

import { FormlyBootstrapFormFieldModule } from "../../form-field";
import { FormlyFieldSelect } from "./select.type";

@NgModule({
  declarations: [FormlyFieldSelect],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FormlyBootstrapFormFieldModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: "select",
          component: FormlyFieldSelect,
          wrappers: ["form-field"],
        },
        { name: "enum", extends: "select" },
      ],
    }),
  ],
})
export class FormlyBootstrapSelectModule {}
