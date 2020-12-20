import { ViewContainerRef, ViewChild, Directive } from "@angular/core";
import { FieldType } from "./field.type";
import { DynamicFieldConfig } from "../models";

export abstract class FieldWrapper<
  F extends DynamicFieldConfig = DynamicFieldConfig
> extends FieldType<F> {
  @ViewChild("fieldComponent", { read: ViewContainerRef, static: true })
  fieldComponent: ViewContainerRef;
}
