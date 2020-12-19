import {
  Injectable,
  ComponentFactoryResolver,
  Injector,
  Optional,
} from "@angular/core";
import { FormGroup, FormArray, FormGroupDirective } from "@angular/forms";
import { DynamicConfig } from "./formly.config";
import {
  DynamicFieldConfig,
  DynamicFormOptions,
  DynamicFieldConfigCache,
} from "../models";
import {
  defineHiddenProp,
  reduceFormUpdateValidityCalls,
  observe,
} from "../utils";

@Injectable({ providedIn: "root" })
export class DynamicFormBuilder {
  constructor(
    private config: DynamicConfig,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Optional() private parentForm: FormGroupDirective
  ) {}

  buildForm(
    form: FormGroup | FormArray,
    fieldGroup: DynamicFieldConfig[] = [],
    model: any,
    options: DynamicFormOptions
  ) {
    this.build({ fieldGroup, model, form, options });
  }

  build(field: DynamicFieldConfig) {
    if (!this.config.extensions.core) {
      throw new Error(
        "NgxDynamic: missing `forRoot()` call. use `forRoot()` when registering the `DynamicModule`."
      );
    }

    if (!field.parent) {
      this._setOptions(field);
      reduceFormUpdateValidityCalls(field.form, () => this._build(field));
      const options = (field as DynamicFieldConfigCache).options;
      options.checkExpressions && options.checkExpressions(field, true);
      options.detectChanges && options.detectChanges(field);
    } else {
      this._build(field);
    }
  }

  private _build(field: DynamicFieldConfigCache) {
    if (!field) {
      return;
    }

    this.getExtensions().forEach(
      (extension) => extension.prePopulate && extension.prePopulate(field)
    );
    this.getExtensions().forEach(
      (extension) => extension.onPopulate && extension.onPopulate(field)
    );

    if (field.fieldGroup) {
      field.fieldGroup.forEach((f) => this._build(f));
    }

    this.getExtensions().forEach(
      (extension) => extension.postPopulate && extension.postPopulate(field)
    );
  }

  private getExtensions() {
    return Object.keys(this.config.extensions).map(
      (name) => this.config.extensions[name]
    );
  }

  private _setOptions(field: DynamicFieldConfigCache) {
    field.form = field.form || new FormGroup({});
    field.model = field.model || {};
    field.options = field.options || {};
    const options = field.options;

    if (!options._resolver) {
      defineHiddenProp(options, "_resolver", this.resolver);
    }

    if (!options._injector) {
      defineHiddenProp(options, "_injector", this.injector);
    }

    if (!options.build) {
      options._buildForm = () => {
        console.warn(
          `Dynamic: 'options._buildForm' is deprecated since v6.0, use 'options.build' instead.`
        );
        this.build(field);
      };

      options.build = (f: DynamicFieldConfig) => {
        this.build(f);

        return f;
      };
    }

    if (!options.parentForm && this.parentForm) {
      defineHiddenProp(options, "parentForm", this.parentForm);
      observe(options, ["parentForm", "submitted"], ({ firstChange }) => {
        if (!firstChange) {
          options.checkExpressions(field);
          options.detectChanges(field);
        }
      });
    }
  }
}
