import { FormlyFieldConfig } from "../../../../../idynamic-form/core/src/lib/core";

export function addonsExtension(field: FormlyFieldConfig) {
  if (
    !field.templateOptions ||
    (field.wrappers && field.wrappers.indexOf("addons") !== -1)
  ) {
    return;
  }

  if (field.templateOptions.addonLeft || field.templateOptions.addonRight) {
    field.wrappers = [...(field.wrappers || []), "addons"];
  }
}
