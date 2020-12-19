import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormlyModule } from "../../../../../idynamic-form/core/src/lib/core";
import { ReactiveFormsModule } from "@angular/forms";

import { FormlyBootstrapFormFieldModule } from "../../form-field";

import { FormlyFieldInput } from "./input.type";

@NgModule({
  declarations: [FormlyFieldInput],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FormlyBootstrapFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: "input",
          component: FormlyFieldInput,
          wrappers: ["form-field"],
        },
        { name: "string", extends: "input" },
        {
          name: "number",
          extends: "input",
          defaultOptions: {
            templateOptions: {
              type: "number",
            },
          },
        },
        {
          name: "integer",
          extends: "input",
          defaultOptions: {
            templateOptions: {
              type: "number",
            },
          },
        },
      ],
    }),
  ],
  entryComponents: [FormlyFieldInput],
})
export class FormlyBootstrapInputModule {}
