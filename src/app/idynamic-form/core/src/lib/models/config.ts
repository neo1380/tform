import { ValidationErrors, AbstractControl } from "@angular/forms";
import { FieldType } from "./../templates/field.type";
import { DynamicFieldConfig } from "./fieldconfig";
import { Observable } from "rxjs";

/** @experimental */
export interface DynamicExtension {
  prePopulate?(field: DynamicFieldConfig): void;
  onPopulate?(field: DynamicFieldConfig): void;
  postPopulate?(field: DynamicFieldConfig): void;
}

export interface TypeOption {
  name: string;
  component?: any;
  wrappers?: string[];
  extends?: string;
  defaultOptions?: DynamicFieldConfig;
}

export interface WrapperOption {
  name: string;
  component: any;
  types?: string[];
}

export type FieldValidatorFn = (
  c: AbstractControl,
  field: DynamicFieldConfig,
  options?: { [id: string]: any }
) => ValidationErrors | null;

export interface ValidatorOption {
  name: string;
  validation: FieldValidatorFn;
  options?: { [id: string]: any };
}

export interface ExtensionOption {
  name: string;
  extension: DynamicExtension;
}

export interface ValidationMessageOption {
  name: string;
  message:
    | string
    | ((error: any, field: DynamicFieldConfig) => string | Observable<string>);
}

export interface ConfigOption {
  types?: TypeOption[];
  wrappers?: WrapperOption[];
  validators?: ValidatorOption[];
  extensions?: ExtensionOption[];
  validationMessages?: ValidationMessageOption[];
  extras?: {
    immutable?: boolean;
    showError?: (field: FieldType) => boolean;

    /**
     * Defines the option which dynamic form rely on to check field expression properties.
     * - `modelChange`: perform a check when the value of the form control changes (Will be set by default in the next major version).
     * - `changeDetectionCheck`: triggers an immediate check when `ngDoCheck` is called.
     *
     * Defaults to `changeDetectionCheck`.
     */
    checkExpressionOn?: "modelChange" | "changeDetectionCheck";

    /**
     * Whether to lazily render field components or not when marked as hidden.
     * - `true`: lazily render field components (Will be set by default in the next major version).
     * - `false`: render field components and use CSS to control their visibility.
     *
     * Defaults to `false`.
     */
    lazyRender?: boolean;

    /**
     * When true, reset the value of hidden fields.
     *
     * Defaults to `false`.
     */
    resetFieldOnHide?: boolean;
  };
}
