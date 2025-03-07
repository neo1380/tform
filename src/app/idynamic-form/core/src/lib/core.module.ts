import { NgModule, ModuleWithProviders, Inject, Optional } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormlyForm } from "./components/formly.form";
import { FormlyField } from "./components/formly.field";
import { FormlyAttributes } from "./templates/formly.attributes";
import { FormlyConfig, FORMLY_CONFIG } from "./services/formly.config";
import { FormlyFormBuilder } from "./services/formly.builder";
import { FormlyGroup } from "./templates/formly.group";
import { FormlyValidationMessage } from "./templates/formly.validation-message";
import { FormlyTemplateType } from "./templates/field-template.type";

import { FieldExpressionExtension } from "./extensions/field-expression/field-expression";
import { FieldValidationExtension } from "./extensions/field-validation/field-validation";
import { FieldFormExtension } from "./extensions/field-form/field-form";
import { CoreExtension } from "./extensions/core/core";
import { ConfigOption } from "./models";

export function defaultFormlyConfig(config: FormlyConfig): ConfigOption {
  return {
    types: [
      { name: "formly-group", component: FormlyGroup },
      { name: "formly-template", component: FormlyTemplateType },
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
    FormlyForm,
    FormlyField,
    FormlyAttributes,
    FormlyGroup,
    FormlyValidationMessage,
    FormlyTemplateType,
  ],
  exports: [
    FormlyForm,
    FormlyField,
    FormlyAttributes,
    FormlyGroup,
    FormlyValidationMessage,
  ],
  imports: [CommonModule],
  entryComponents: [FormlyGroup],
})
export class FormlyModule {
  static forRoot(config: ConfigOption = {}): ModuleWithProviders<FormlyModule> {
    return {
      ngModule: FormlyModule,
      providers: [
        {
          provide: FORMLY_CONFIG,
          multi: true,
          useFactory: defaultFormlyConfig,
          deps: [FormlyConfig],
        },
        { provide: FORMLY_CONFIG, useValue: config, multi: true },
        FormlyConfig,
        FormlyFormBuilder,
      ],
    };
  }

  static forChild(
    config: ConfigOption = {}
  ): ModuleWithProviders<FormlyModule> {
    return {
      ngModule: FormlyModule,
      providers: [
        { provide: FORMLY_CONFIG, useValue: config, multi: true },
        FormlyFormBuilder,
      ],
    };
  }

  constructor(
    configService: FormlyConfig,
    @Optional() @Inject(FORMLY_CONFIG) configs: ConfigOption[] = []
  ) {
    if (!configs) {
      return;
    }

    configs.forEach((config) => configService.addConfig(config));
  }
}
