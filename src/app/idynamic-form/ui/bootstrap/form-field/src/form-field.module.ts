import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DynamicModule } from "../../../../../idynamic-form/core/src/lib/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicWrapperFormField } from "./form-field.wrapper";

@NgModule({
  declarations: [DynamicWrapperFormField],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    DynamicModule.forChild({
      wrappers: [
        {
          name: "form-field",
          component: DynamicWrapperFormField,
        },
      ],
    }),
  ],
  entryComponents: [DynamicWrapperFormField],
})
export class DynamicBootstrapFormFieldModule {}
