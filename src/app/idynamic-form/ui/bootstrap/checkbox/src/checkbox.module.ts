import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DynamicModule } from "../../../../../idynamic-form/core/src/lib/core";
import { ReactiveFormsModule } from "@angular/forms";

import { DynamicBootstrapFormFieldModule } from "../../form-field";

import { DynamicFieldCheckbox } from "./checkbox.type";

@NgModule({
  declarations: [DynamicFieldCheckbox],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicBootstrapFormFieldModule,
    DynamicModule.forChild({
      types: [
        {
          name: "checkbox",
          component: DynamicFieldCheckbox,
          wrappers: ["form-field"],
        },
        {
          name: "boolean",
          extends: "checkbox",
        },
      ],
    }),
  ],
  entryComponents: [DynamicFieldCheckbox],
})
export class DynamicBootstrapCheckboxModule {}
