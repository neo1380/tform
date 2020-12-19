import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FieldWrapper } from "../../../../../idynamic-form/core/src/lib/core";

@Component({
  selector: "formly-wrapper-addons",
  templateUrl: "./addons.component.html",
  styleUrls: ["./addons.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyWrapperAddons extends FieldWrapper {
  addonRightClick($event: any) {
    if (this.to.addonRight.onClick) {
      this.to.addonRight.onClick(this.to, this, $event);
    }
  }

  addonLeftClick($event: any) {
    if (this.to.addonLeft.onClick) {
      this.to.addonLeft.onClick(this.to, this, $event);
    }
  }
}
