import { NgModule, ModuleWithProviders, Inject, Optional } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DynamicForm } from "./components/formly.form";
import { DynamicField } from "./components/formly.field";
import { DynamicAttributes } from "./templates/formly.attributes";
import { DynamicConfig, FORMLY_CONFIG } from "./services/formly.config";
import { DynamicFormBuilder } from "./services/formly.builder";
import { DynamicGroup } from "./templates/formly.group";
import { DynamicValidationMessage } from "./templates/formly.validation-message";
import { DynamicTemplateType } from "./templates/field-template.type";

import { FieldExpressionExtension } from "./extensions/field-expression/field-expression";
import { FieldValidationExtension } from "./extensions/field-validation/field-validation";
import { FieldFormExtension } from "./extensions/field-form/field-form";
import { CoreExtension } from "./extensions/core/core";
import { ConfigOption } from "./models";

export function defaultDynamicConfig(config: DynamicConfig): ConfigOption {
  return {
    types: [
      { name: "formly-group", component: DynamicGroup },
      { name: "formly-template", component: DynamicTemplateType },
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
          provide: FORMLY_CONFIG,
          multi: true,
          useFactory: defaultDynamicConfig,
          deps: [DynamicConfig],
        },
        { provide: FORMLY_CONFIG, useValue: config, multi: true },
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
        { provide: FORMLY_CONFIG, useValue: config, multi: true },
        DynamicFormBuilder,
      ],
    };
  }

  constructor(
    configService: DynamicConfig,
    @Optional() @Inject(FORMLY_CONFIG) configs: ConfigOption[] = []
  ) {
    if (!configs) {
      return;
    }

    configs.forEach((config) => configService.addConfig(config));
  }
}
