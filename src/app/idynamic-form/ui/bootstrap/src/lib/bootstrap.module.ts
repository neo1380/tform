import { NgModule } from "@angular/core";

import { DynamicBootstrapFormFieldModule } from "../../../bootstrap/form-field";
import { DynamicBootstrapInputModule } from "../../../bootstrap/input";
import { DynamicBootstrapTextAreaModule } from "../../../bootstrap/textarea";
import { DynamicBootstrapRadioModule } from "../../../bootstrap/radio";
import { DynamicBootstrapCheckboxModule } from "../../../bootstrap/checkbox";
import { DynamicBootstrapMultiCheckboxModule } from "../../../bootstrap/multicheckbox";
import { DynamicBootstrapSelectModule } from "../../../bootstrap/select";
import { DynamicBootstrapAddonsModule } from "../../../bootstrap/addons";

@NgModule({
  imports: [
    DynamicBootstrapFormFieldModule,
    DynamicBootstrapInputModule,
    DynamicBootstrapTextAreaModule,
    DynamicBootstrapRadioModule,
    DynamicBootstrapCheckboxModule,
    DynamicBootstrapMultiCheckboxModule,
    DynamicBootstrapSelectModule,
    DynamicBootstrapAddonsModule,
  ],
})
export class DynamicBootstrapModule {}
