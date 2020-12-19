import { ChangeDetectorRef } from "@angular/core";
import { DynamicConfig } from "../../services/formly.config";
import {
  DynamicFieldConfigCache,
  DynamicValueChangeEvent,
  DynamicExtension,
} from "../../models";
import {
  getFieldId,
  assignFieldValue,
  isUndefined,
  getFieldValue,
  reverseDeepMerge,
  defineHiddenProp,
  clone,
} from "../../utils";
import { Subject } from "rxjs";

/** @experimental */
export class CoreExtension implements DynamicExtension {
  private formId = 0;
  constructor(private config: DynamicConfig) {}

  prePopulate(field: DynamicFieldConfigCache) {
    const root = field.parent;
    this.initRootOptions(field);
    if (root) {
      Object.defineProperty(field, "options", {
        get: () => root.options,
        configurable: true,
      });
      Object.defineProperty(field, "model", {
        get: () =>
          field.key && field.fieldGroup ? getFieldValue(field) : root.model,
        configurable: true,
      });
    }

    this.getFieldComponentInstance(field).prePopulate();
  }

  onPopulate(field: DynamicFieldConfigCache) {
    this.initFieldOptions(field);
    this.getFieldComponentInstance(field).onPopulate();
    if (field.fieldGroup) {
      field.fieldGroup.forEach((f, index) => {
        if (f) {
          Object.defineProperty(f, "parent", {
            get: () => field,
            configurable: true,
          });
          Object.defineProperty(f, "index", {
            get: () => index,
            configurable: true,
          });
        }
        this.formId++;
      });
    }
  }

  postPopulate(field: DynamicFieldConfigCache) {
    this.getFieldComponentInstance(field).postPopulate();
  }

  private initRootOptions(field: DynamicFieldConfigCache) {
    if (field.parent) {
      return;
    }

    const options = field.options;
    field.options.formState = field.options.formState || {};
    if (!options.showError) {
      options.showError = this.config.extras.showError;
    }

    if (!options.fieldChanges) {
      defineHiddenProp(
        options,
        "fieldChanges",
        new Subject<DynamicValueChangeEvent>()
      );
    }

    if (!options._hiddenFieldsForCheck) {
      options._hiddenFieldsForCheck = [];
    }

    options._markForCheck = (f) => {
      console.warn(
        `Dynamic: 'options._markForCheck' is deprecated since v6.0, use 'options.detectChanges' instead.`
      );
      options.detectChanges(f);
    };

    options.detectChanges = (f: DynamicFieldConfigCache) => {
      if (f._componentRefs) {
        f._componentRefs.forEach((ref) => {
          // NOTE: we cannot use ref.changeDetectorRef, see https://github.com/ngx-formly/ngx-formly/issues/2191
          const changeDetectorRef = ref.injector.get(ChangeDetectorRef);
          changeDetectorRef.markForCheck();
        });
      }

      if (f.fieldGroup) {
        f.fieldGroup.forEach((f) => f && options.detectChanges(f));
      }
    };

    options.resetModel = (model?: any) => {
      // model = clone(model ?? options._initialModel);
      //*doc updates */
      model = clone(
        model !== null && model !== undefined ? model : options._initialModel
      );

      if (field.model) {
        Object.keys(field.model).forEach((k) => delete field.model[k]);
        Object.assign(field.model, model || {});
      }

      options.build(field);
      field.form.reset(model);
      if (
        options.parentForm &&
        options.parentForm.control === field.formControl
      ) {
        (options.parentForm as { submitted: boolean }).submitted = false;
      }
    };

    options.updateInitialValue = () =>
      (options._initialModel = clone(field.model));
    field.options.updateInitialValue();
  }

  private initFieldOptions(field: DynamicFieldConfigCache) {
    reverseDeepMerge(field, {
      id: getFieldId(`formly_${this.formId}`, field, field["index"]),
      hooks: {},
      modelOptions: {},
      templateOptions:
        !field.type || !field.key
          ? {}
          : {
              label: "",
              placeholder: "",
              focus: false,
              disabled: false,
            },
    });

    if (this.config.extras.resetFieldOnHide) {
      field["autoClear"] = true;
    }

    if (
      field.type !== "formly-template" &&
      (field.template ||
        (field.expressionProperties && field.expressionProperties.template))
    ) {
      field.type = "formly-template";
    }

    if (!field.type && field.fieldGroup) {
      field.type = "formly-group";
    }

    if (field.type) {
      this.config.getMergedField(field);
    }

    if (
      !isUndefined(field.key) &&
      !isUndefined(field.defaultValue) &&
      isUndefined(getFieldValue(field))
    ) {
      let setDefaultValue =
        !field["autoClear"] || !(field.hide || field.hideExpression);
      if (setDefaultValue && field["autoClear"]) {
        let parent = field.parent;
        while (parent && !parent.hideExpression && !parent.hide) {
          parent = parent.parent;
        }
        setDefaultValue = !parent || !(parent.hideExpression || parent.hide);
      }

      if (setDefaultValue) {
        assignFieldValue(field, field.defaultValue);
      }
    }

    field.wrappers = field.wrappers || [];
  }

  private getFieldComponentInstance(field: DynamicFieldConfigCache) {
    const componentRef = this.config.resolveFieldTypeRef(field);
    const instance: DynamicExtension = componentRef
      ? (componentRef.instance as any)
      : {};

    return {
      prePopulate: () => instance.prePopulate && instance.prePopulate(field),
      onPopulate: () => instance.onPopulate && instance.onPopulate(field),
      postPopulate: () => instance.postPopulate && instance.postPopulate(field),
    };
  }
}
