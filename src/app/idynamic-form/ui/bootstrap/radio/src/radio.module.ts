import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DynamicModule } from "../../../../../idynamic-form/core/src/lib/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicSelectModule } from "../../../../core/select";

import { DynamicBootstrapFormFieldModule } from "../../form-field";
import { DynamicFieldRadio } from "./radio.type";

@NgModule({
  declarations: [DynamicFieldRadio],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    DynamicBootstrapFormFieldModule,
    DynamicSelectModule,
    DynamicModule.forChild({
      types: [
        {
          name: "radio",
          component: DynamicFieldRadio,
          wrappers: ["form-field"],
        },
      ],
    }),
  ],
  entryComponents: [DynamicFieldRadio],
})
export class DynamicBootstrapRadioModule {}
