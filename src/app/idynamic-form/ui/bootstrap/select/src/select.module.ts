import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicModule } from "../../../../../idynamic-form/core/src/lib/core";
import { DynamicSelectModule } from "../../../../core/select";

import { DynamicBootstrapFormFieldModule } from "../../form-field";
import { DynamicFieldSelect } from "./select.type";

@NgModule({
  declarations: [DynamicFieldSelect],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    DynamicBootstrapFormFieldModule,
    DynamicSelectModule,
    DynamicModule.forChild({
      types: [
        {
          name: "select",
          component: DynamicFieldSelect,
          wrappers: ["form-field"],
        },
        { name: "enum", extends: "select" },
      ],
    }),
  ],
})
export class DynamicBootstrapSelectModule {}
