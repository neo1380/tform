import { NgModule } from "@angular/core";

import { FormlyBootstrapFormFieldModule } from "../../../bootstrap/form-field";
import { FormlyBootstrapInputModule } from "../../../bootstrap/input";
import { FormlyBootstrapTextAreaModule } from "../../../bootstrap/textarea";
import { FormlyBootstrapRadioModule } from "../../../bootstrap/radio";
import { FormlyBootstrapCheckboxModule } from "../../../bootstrap/checkbox";
import { FormlyBootstrapMultiCheckboxModule } from "../../../bootstrap/multicheckbox";
import { FormlyBootstrapSelectModule } from "../../../bootstrap/select";
import { FormlyBootstrapAddonsModule } from "../../../bootstrap/addons";

@NgModule({
  imports: [
    FormlyBootstrapFormFieldModule,
    FormlyBootstrapInputModule,
    FormlyBootstrapTextAreaModule,
    FormlyBootstrapRadioModule,
    FormlyBootstrapCheckboxModule,
    FormlyBootstrapMultiCheckboxModule,
    FormlyBootstrapSelectModule,
    FormlyBootstrapAddonsModule,
  ],
})
export class FormlyBootstrapModule {}
