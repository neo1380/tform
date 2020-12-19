import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicModule } from "../../../../../idynamic-form/core/src/lib/core";
import { DynamicSelectModule } from "../../../../core/select";
import { DynamicBootstrapFormFieldModule } from "../../form-field";

import { DynamicFieldMultiCheckbox } from "./multicheckbox.type";

@NgModule({
  declarations: [DynamicFieldMultiCheckbox],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    DynamicBootstrapFormFieldModule,
    DynamicSelectModule,
    DynamicModule.forChild({
      types: [
        {
          name: "multicheckbox",
          component: DynamicFieldMultiCheckbox,
          wrappers: ["form-field"],
        },
      ],
    }),
  ],
})
export class DynamicBootstrapMultiCheckboxModule {}
