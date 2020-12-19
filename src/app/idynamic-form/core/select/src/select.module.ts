import { NgModule } from "@angular/core";
import { DynamicSelectOptionsPipe } from "./select-options.pipe";

@NgModule({
  declarations: [DynamicSelectOptionsPipe],
  exports: [DynamicSelectOptionsPipe],
})
export class DynamicSelectModule {}
