import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DynamicModule } from "../../../../../idynamic-form/core/src/lib/core";
import { ReactiveFormsModule } from "@angular/forms";

import { DynamicBootstrapFormFieldModule } from "../../form-field";
import { DynamicFieldTextArea } from "./textarea.type";

@NgModule({
  declarations: [DynamicFieldTextArea],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    DynamicBootstrapFormFieldModule,
    DynamicModule.forChild({
      types: [
        {
          name: "textarea",
          component: DynamicFieldTextArea,
          wrappers: ["form-field"],
        },
      ],
    }),
  ],
  entryComponents: [DynamicFieldTextArea],
})
export class DynamicBootstrapTextAreaModule {}
