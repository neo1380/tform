/* import { DynamicFieldConfig } from "../../../../../idynamic-form/core/src/lib/core";
import { createDynamicFieldComponent } from "@ngx-formly/core/testing";
import { DynamicBootstrapFormFieldModule } from "../../form-field";

const renderComponent = (field: DynamicFieldConfig) => {
  return createDynamicFieldComponent(field, {
    imports: [DynamicBootstrapFormFieldModule],
  });
};

describe("ui-bootstrap: FormField Wrapper", () => {
  it("should render form-field wrapper", () => {
    const { query } = renderComponent({
      wrappers: ["form-field"],
      templateOptions: {
        label: "Name",
        required: true,
        description: "Name description",
      },
    });

    expect(query("formly-wrapper-form-field")).not.toBeNull();

    // Label + Required marker
    expect(query("label").nativeElement.textContent).toEqual(" Name *");
    // Description
    expect(query("small.form-text").nativeElement.textContent).toEqual(
      "Name description"
    );
  });

  it("should show error message", () => {
    const { query } = renderComponent({
      key: "name",
      wrappers: ["form-field"],
      validation: { show: true },
      templateOptions: {
        label: "Name",
        required: true,
      },
    });

    expect(query("formly-validation-message")).not.toBeNull();
  });

  it("should hide required marker", () => {
    const { query } = renderComponent({
      wrappers: ["form-field"],
      templateOptions: {
        label: "Name",
        hideRequiredMarker: true,
        required: true,
      },
    });

    expect(query("label").nativeElement.textContent).toEqual(" Name ");
  });

  it("should hide label", () => {
    const { query } = renderComponent({
      wrappers: ["form-field"],
      templateOptions: {
        label: "Name",
        hideLabel: true,
      },
    });

    expect(query("label")).toBeNull();
  });
});
 */
