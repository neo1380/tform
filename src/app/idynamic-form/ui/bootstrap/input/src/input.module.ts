import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DynamicModule } from "../../../../../idynamic-form/core/src/lib/core";
import { ReactiveFormsModule } from "@angular/forms";

import { DynamicBootstrapFormFieldModule } from "../../form-field";

import { DynamicFieldInput } from "./input.type";

@NgModule({
  declarations: [DynamicFieldInput],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    DynamicBootstrapFormFieldModule,
    DynamicModule.forChild({
      types: [
        {
          name: "input",
          component: DynamicFieldInput,
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
  entryComponents: [DynamicFieldInput],
})
export class DynamicBootstrapInputModule {}
