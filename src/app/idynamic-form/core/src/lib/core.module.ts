import { NgModule, ModuleWithProviders, Inject, Optional } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DynamicForm } from "./components/dynamic.form";
import { DynamicField } from "./components/dynamic.field";
import { DynamicAttributes } from "./templates/dynamicform.attributes";
import {
  DynamicConfig,
  DYNAMICFORM_CONFIG,
} from "./services/dynamicform.config";
import { DynamicFormBuilder } from "./services/dynamicform.builder";
import { DynamicGroup } from "./templates/dynamicform.group";
import { DynamicValidationMessage } from "./templates/dynamicform.validation-message";
import { DynamicTemplateType } from "./templates/field-template.type";

import { FieldExpressionExtension } from "./extensions/field-expression/field-expression";
import { FieldValidationExtension } from "./extensions/field-validation/field-validation";
import { FieldFormExtension } from "./extensions/field-form/field-form";
import { CoreExtension } from "./extensions/core/core";
import { ConfigOption } from "./models";

export function defaultDynamicConfig(config: DynamicConfig): ConfigOption {
  return {
    types: [
      { name: "dynamicform-group", component: DynamicGroup },
      { name: "dynamicform-template", component: DynamicTemplateType },
    ],
    extensions: [
      { name: "core", extension: new CoreExtension(config) },
      {
        name: "field-validation",
        extension: new FieldValidationExtension(config),
      },
      { name: "field-form", extension: new FieldFormExtension() },
      { name: "field-expression", extension: new FieldExpressionExtension() },
    ],
  };
}

@NgModule({
  declarations: [
    DynamicForm,
    DynamicField,
    DynamicAttributes,
    DynamicGroup,
    DynamicValidationMessage,
    DynamicTemplateType,
  ],
  exports: [
    DynamicForm,
    DynamicField,
    DynamicAttributes,
    DynamicGroup,
    DynamicValidationMessage,
  ],
  imports: [CommonModule],
  entryComponents: [DynamicGroup],
})
export class DynamicModule {
  static forRoot(
    config: ConfigOption = {}
  ): ModuleWithProviders<DynamicModule> {
    return {
      ngModule: DynamicModule,
      providers: [
        {
          provide: DYNAMICFORM_CONFIG,
          multi: true,
          useFactory: defaultDynamicConfig,
          deps: [DynamicConfig],
        },
        { provide: DYNAMICFORM_CONFIG, useValue: config, multi: true },
        DynamicConfig,
        DynamicFormBuilder,
      ],
    };
  }

  static forChild(
    config: ConfigOption = {}
  ): ModuleWithProviders<DynamicModule> {
    return {
      ngModule: DynamicModule,
      providers: [
        { provide: DYNAMICFORM_CONFIG, useValue: config, multi: true },
        DynamicFormBuilder,
      ],
    };
  }

  constructor(
    configService: DynamicConfig,
    @Optional() @Inject(DYNAMICFORM_CONFIG) configs: ConfigOption[] = []
  ) {
    if (!configs) {
      return;
    }

    configs.forEach((config) => configService.addConfig(config));
  }
}
