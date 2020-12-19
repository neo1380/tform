import {
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
} from "@angular/core";
import {
  AsyncValidatorFn,
  ValidatorFn,
  FormArray,
  FormGroup,
  AbstractControl,
} from "@angular/forms";
import { FieldType } from "../templates/field.type";
import { DynamicFieldConfig, DynamicFormOptions } from "./fieldconfig";

export interface DynamicFieldConfigCache extends DynamicFieldConfig {
  form?: FormGroup | FormArray;
  model?: any;
  formControl?: AbstractControl;
  parent?: DynamicFieldConfigCache;
  options?: DynamicFormOptionsCache;
  _expressions?: { [property: string]: (ingoreCache: boolean) => boolean };
  _hide?: boolean;
  _validators?: ValidatorFn[];
  _asyncValidators?: AsyncValidatorFn[];
  _componentRefs?: ComponentRef<FieldType>[];
  _keyPath?: {
    key: DynamicFieldConfig["key"];
    path: string[];
  };
}

export interface DynamicFormOptionsCache extends DynamicFormOptions {
  checkExpressions?: (field: DynamicFieldConfig, ingoreCache?: boolean) => void;
  _resolver?: ComponentFactoryResolver;
  _injector?: Injector;
  _hiddenFieldsForCheck?: DynamicFieldConfigCache[];
  _initialModel?: any;

  /** @deprecated */
  _buildForm?: () => void;

  /** @deprecated */
  _checkField?: (field: DynamicFieldConfig, ingoreCache?: boolean) => void;

  /** @deprecated */
  _markForCheck?: (field: DynamicFieldConfig) => void;
}
