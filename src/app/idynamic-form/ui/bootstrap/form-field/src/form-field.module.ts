import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormlyModule } from "../../../../../idynamic-form/core/src/lib/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyWrapperFormField } from "./form-field.wrapper";

@NgModule({
  declarations: [FormlyWrapperFormField],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FormlyModule.forChild({
      wrappers: [
        {
          name: "form-field",
          component: FormlyWrapperFormField,
        },
      ],
    }),
  ],
  entryComponents: [FormlyWrapperFormField],
})
export class FormlyBootstrapFormFieldModule {}
