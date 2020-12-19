import { DynamicFieldConfig } from "../../../../../idynamic-form/core/src/lib/core";
import { createDynamicFieldComponent } from "@ngx-formly/core/testing";
import { DynamicBootstrapCheckboxModule } from "@ngx-formly/bootstrap/checkbox";

const renderComponent = (field: DynamicFieldConfig) => {
  return createDynamicFieldComponent(field, {
    imports: [DynamicBootstrapCheckboxModule],
  });
};

describe("ui-bootstrap: Checkbox Type", () => {
  it("should render checkbox type", () => {
    const { field, query } = renderComponent({
      key: "name",
      type: "checkbox",
    });

    expect(query("formly-wrapper-form-field")).not.toBeNull();

    const { properties, attributes, classes } = query('input[type="checkbox"]');
    expect(properties).toMatchObject({ indeterminate: true });
    expect(classes).toMatchObject({ "custom-control-input": true });
    expect(attributes).toMatchObject({
      id: "formly_1_checkbox_name_0",
      type: "checkbox",
    });
  });

  it("should render boolean type", () => {
    const { query } = renderComponent({
      key: "name",
      type: "boolean",
    });

    expect(query("formly-wrapper-form-field")).not.toBeNull();

    const { properties, attributes, classes } = query('input[type="checkbox"]');
    expect(properties).toMatchObject({ indeterminate: true });
    expect(classes).toMatchObject({ "custom-control-input": true });
    expect(attributes).toMatchObject({
      id: "formly_1_boolean_name_0",
      type: "checkbox",
    });
  });

  it("should bind control value on change", () => {
    const { query, field, detectChanges } = renderComponent({
      key: "name",
      type: "checkbox",
    });

    const inputDebugEl = query<HTMLInputElement>('input[type="checkbox"]');

    inputDebugEl.triggerEventHandler("change", { target: { checked: true } });
    detectChanges();
    expect(field.formControl.value).toBeTrue();

    inputDebugEl.triggerEventHandler("change", { target: { checked: false } });
    detectChanges();
    expect(field.formControl.value).toBeFalse();
  });
});
