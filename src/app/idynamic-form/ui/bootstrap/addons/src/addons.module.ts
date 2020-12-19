import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DynamicModule } from "../../../../../idynamic-form/core/src/lib/core";
import { ReactiveFormsModule } from "@angular/forms";

import { DynamicWrapperAddons } from "./addons.component";
import { addonsExtension } from "./addon.extension";

@NgModule({
  declarations: [DynamicWrapperAddons],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    DynamicModule.forChild({
      wrappers: [{ name: "addons", component: DynamicWrapperAddons }],
      extensions: [
        { name: "addons", extension: { postPopulate: addonsExtension } },
      ],
    }),
  ],
})
export class DynamicBootstrapAddonsModule {}
