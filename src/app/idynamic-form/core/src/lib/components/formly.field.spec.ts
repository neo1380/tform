import {
  Component,
  ChangeDetectionStrategy,
  Injectable,
  Optional,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FieldWrapper, FormlyFieldConfig } from "@ngx-formly/core";
import {
  createFormlyFieldComponent,
  FormlyInputModule,
  createFieldChangesSpy,
} from "@ngx-formly/core/testing";
import { tick, fakeAsync } from "@angular/core/testing";
import { tap, map, shareReplay } from "rxjs/operators";
import { FormlyFieldConfigCache } from "../models";
import { timer } from "rxjs";
import { FieldType } from "../templates/field.type";

const renderComponent = (field: FormlyFieldConfig, opts: any = {}) => {
  const { config, ...options } = opts;
  return createFormlyFieldComponent(field, {
    imports: [FormlyInputModule],
    declarations: [
      FormlyWrapperFormFieldAsync,
      FormlyOnPushComponent,
      FormlyParentComponent,
      FormlyChildComponent,
    ],
    config: {
      types: [
        {
          name: "on-push",
          component: FormlyOnPushComponent,
        },
        {
          name: "parent",
          component: FormlyParentComponent,
        },
        {
          name: "child",
          component: FormlyChildComponent,
        },
      ],
      wrappers: [
        {
          name: "form-field-async",
          component: FormlyWrapperFormFieldAsync,
        },
      ],
      ...(config || {}),
    },
    ...options,
  });
};

describe("FormlyField Component", () => {
  it("should add style display none to hidden field", () => {
    const { field, detectChanges, query } = renderComponent({ hide: true });
    const { styles } = query("formly-field");

    expect(styles.display).toEqual("none");

    field.hide = false;
    detectChanges();
    expect(styles.display).toEqual("");
  });

  it("should add field className", () => {
    const { query } = renderComponent({ className: "foo-class" });

    expect(query("formly-field").attributes.class).toEqual("foo-class");
  });

  describe("host attrs", () => {
    it("should set style and class attrs on first render", () => {
      const { query } = renderComponent({
        hide: true,
        className: "foo",
      });
      expect(query("formly-field").attributes.class).toEqual("foo");
      expect(query("formly-field").styles.display).toEqual("none");
    });

    it("should update style and class attrs on change", () => {
      const { field, query } = renderComponent({});

      expect(query("formly-field").attributes.class).toEqual(undefined);
      expect(query("formly-field").styles.display).toEqual("");

      field.hide = true;
      field.className = "foo";

      expect(query("formly-field").attributes.class).toEqual("foo");
      expect(query("formly-field").styles.display).toEqual("none");
    });

    it("should not override existing class", () => {
      const { query } = renderComponent(
        {},
        {
          template: '<formly-field class="foo" [field]="field"></formly-field>',
        }
      );

      expect(query("formly-field").attributes.class).toEqual("foo");
    });
  });

  it("should call field hooks if set", () => {
    const f: FormlyFieldConfig = {
      hooks: {
        afterContentInit: () => {},
        afterViewInit: () => {},
        onInit: () => {},
        onChanges: () => {},
        onDestroy: () => {},
      },
    };

    const hooks = f.hooks;
    Object.keys(f.hooks).forEach((hook) => {
      spyOn(hooks, hook as any);
    });

    const { fixture, field } = renderComponent(f);
    fixture.destroy();

    Object.keys(f.hooks).forEach((name) => {
      expect(hooks[name]).toHaveBeenCalledWith(field);
    });
  });

  it("should render field type without wrapper", () => {
    const { query } = renderComponent({
      key: "title",
      type: "input",
      wrappers: [],
    });

    expect(query("formly-wrapper-form-field")).toBeNull();
    expect(query("formly-type-input")).not.toBeNull();
  });

  it("should render field component with wrapper", () => {
    const { query } = renderComponent({
      key: "title",
      type: "input",
      wrappers: ["form-field"],
    });

    expect(query("formly-wrapper-form-field")).not.toBeNull();
    expect(query("formly-type-input")).not.toBeNull();
  });

  it("should not throw error when field is null", () => {
    const render = () => renderComponent(null);

    expect(render).not.toThrowError();
  });

  it("should render field component with async wrapper", () => {
    const { field, detectChanges, query } = renderComponent({
      key: "title",
      type: "input",
      wrappers: ["form-field-async"],
      templateOptions: { render: false },
    });

    expect(query("formly-wrapper-form-field-async")).not.toBeNull();
    expect(query("formly-type-input")).toBeNull();

    field.templateOptions.render = true;
    detectChanges();
    expect(query("formly-type-input")).not.toBeNull();
  });

  it("should lazy render field components", () => {
    const { field, detectChanges, query, fixture } = renderComponent(
      {
        key: "title",
        type: "input",
        hide: true,
      },
      { config: { extras: { lazyRender: true } } }
    );

    expect(query("formly-type-input")).toBeNull();

    field.hide = false;
    detectChanges();
    expect(query("formly-type-input")).not.toBeNull();
  });

  it("init hooks with observables", () => {
    const control = new FormControl();
    const spy = jest.fn();
    const initHookFn = (f: FormlyFieldConfig) => {
      return f.formControl.valueChanges.pipe(tap(spy));
    };

    const { fixture } = renderComponent({
      key: "title",
      type: "input",
      formControl: control,
      modelOptions: {},
      parent: {
        formControl: new FormGroup({}),
      },
      hooks: {
        afterContentInit: initHookFn,
        afterViewInit: initHookFn,
        onInit: initHookFn,
      },
    });

    expect(spy).not.toHaveBeenCalled();

    control.patchValue("test");
    expect(spy).toHaveBeenCalledTimes(3);

    spy.mockReset();
    fixture.destroy();
    control.patchValue("test");
    expect(spy).not.toHaveBeenCalled();
  });

  it("should render after onInit", () => {
    const { query } = renderComponent({
      type: "input",
      hooks: {
        onInit: (f: FormlyFieldConfigCache) =>
          (f.formControl = new FormControl()),
      },
    });

    expect(query("formly-type-input")).not.toBeNull();
  });

  it("should render field type for each formly-field instance", () => {
    const { queryAll } = renderComponent(
      {
        type: "input",
        formControl: new FormControl(),
        modelOptions: {},
        templateOptions: { duplicate: true },
      },
      {
        template: `
          <formly-field *ngIf="field.templateOptions.duplicate" [field]="field"></formly-field>
          <formly-field class="target" [field]="field"></formly-field>
        `,
      }
    );

    expect(queryAll("formly-type-input").length).toEqual(2);
  });

  it("should update template options of OnPush FieldType #2191", async () => {
    const options$ = timer(0).pipe(
      map(() => [{ value: 5, label: "Option 5" }]),
      shareReplay(1)
    );
    const { field, query, detectChanges } = renderComponent({
      key: "push",
      type: "on-push",
      templateOptions: {
        options: [{ value: 1, label: "Option 1" }],
      },
      expressionProperties: {
        "templateOptions.options": options$,
      },
    });

    const onPushInstance = query(".to").nativeElement;
    expect(onPushInstance.textContent).toEqual(
      JSON.stringify(
        {
          ...field.templateOptions,
          options: [{ value: 1, label: "Option 1" }],
        },
        null,
        2
      )
    );

    await options$.toPromise();

    detectChanges();

    expect(onPushInstance.textContent).toEqual(
      JSON.stringify(
        {
          ...field.templateOptions,
          options: [{ value: 5, label: "Option 5" }],
        },
        null,
        2
      )
    );
  });

  it("should take account of formState update", () => {
    const { field, query, detectChanges } = renderComponent({
      key: "push",
      type: "on-push",
      templateOptions: {},
      options: { formState: { foo: true } },
    });

    expect(query(".formState").nativeElement.textContent).toEqual(
      JSON.stringify({ foo: true }, null, 2)
    );

    field.options.formState.foo = false;
    detectChanges();

    expect(query(".formState").nativeElement.textContent).toEqual(
      JSON.stringify({ foo: false }, null, 2)
    );
  });

  describe("valueChanges", () => {
    it("should emit valueChanges on control value change", () => {
      const { field } = renderComponent({
        key: "foo",
        type: "input",
      });

      const [spy, subscription] = createFieldChangesSpy(field);

      field.formControl.setValue("First value");
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        value: "First value",
        field,
        type: "valueChanges",
      });
      expect(field.model).toEqual({ foo: "First value" });
      subscription.unsubscribe();
    });

    it("should apply parsers to the emitted valueChanges", () => {
      const { field } = renderComponent({
        key: "foo",
        type: "input",
        parsers: [Number],
      });

      const [spy, subscription] = createFieldChangesSpy(field);

      field.formControl.setValue("15");
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        value: 15,
        field,
        type: "valueChanges",
      });
      subscription.unsubscribe();
    });

    it("should apply debounce to the emitted valueChanges", fakeAsync(() => {
      const { field } = renderComponent({
        key: "foo",
        type: "input",
        modelOptions: {
          debounce: { default: 5 },
        },
      });

      const [spy, subscription] = createFieldChangesSpy(field);

      field.formControl.setValue("15");

      expect(spy).not.toHaveBeenCalled();
      tick(6);
      expect(spy).toHaveBeenCalled();
      subscription.unsubscribe();
    }));

    it('should ignore default debounce when using "blur" or "submit"', () => {
      const { field } = renderComponent({
        key: "foo",
        type: "input",
        modelOptions: {
          debounce: { default: 5 },
          updateOn: "blur",
        },
      });

      const [spy, subscription] = createFieldChangesSpy(field);

      field.formControl.setValue("15");
      expect(spy).toHaveBeenCalled();
      subscription.unsubscribe();
    });

    // https://github.com/ngx-formly/ngx-formly/issues/1857
    it("should emit a valid model value when using square bracket notation for key", () => {
      const { field } = renderComponent({
        key: "o[0].0.name",
        type: "input",
      });

      field.formControl.setValue("***");
      expect(field.parent.model).toEqual({ o: [[{ name: "***" }]] });
    });

    it("should emit a valid model value when using square bracket notation for a fieldGroup key", () => {
      const { field } = renderComponent({
        key: "group[0]",
        fieldGroup: [{ key: "name", type: "input" }],
      });

      field.fieldGroup[0].formControl.setValue("***");
      expect(field.parent.model).toEqual({ group: [{ name: "***" }] });
    });

    it("should emit valueChanges on group control value change", () => {
      const { field } = renderComponent({
        key: "foo",
        fieldGroup: [{ type: "input", key: "bar" }],
      });

      const [spy, subscription] = createFieldChangesSpy(field);

      field.formControl.setValue({ bar: "First value" });
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        value: "First value",
        field: field.fieldGroup[0],
        type: "valueChanges",
      });
      expect(field.parent.model).toEqual({ foo: { bar: "First value" } });
      subscription.unsubscribe();
    });

    it("should emit `modelChange` when custom FormGroup change", () => {
      const { field } = renderComponent({
        key: "foo",
        formControl: new FormGroup({
          bar: new FormControl(),
        }),
      });
      const [spy, subscription] = createFieldChangesSpy(field);

      field.formControl.get("bar").setValue("foo");
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        value: { bar: "foo" },
        field,
        type: "valueChanges",
      });
      expect(field.parent.model).toEqual({ foo: { bar: "foo" } });
      subscription.unsubscribe();
    });

    it("should emit `modelChange` twice when key is duplicated", () => {
      const { field } = renderComponent({
        fieldGroup: [
          { key: "title", type: "input" },
          { key: "title", type: "input" },
        ],
      });

      const [spy, subscription] = createFieldChangesSpy(field);

      field.formControl.get("title").setValue("***");
      expect(spy).toHaveBeenCalledTimes(2);
      subscription.unsubscribe();
    });

    it("should keep the value in sync when using multiple fields with same key", () => {
      const { field, detectChanges, queryAll } = renderComponent({
        fieldGroup: [
          { key: "title", type: "input" },
          { key: "title", type: "input" },
        ],
      });

      const inputs = queryAll<HTMLInputElement>("input");
      inputs[0].triggerEventHandler("input", { target: { value: "First" } });

      detectChanges();
      expect(field.formControl.value).toEqual({ title: "First" });
      expect(inputs[0].nativeElement.value).toEqual("First");
      expect(inputs[1].nativeElement.value).toEqual("First");
    });
  });

  describe("component-level injectors", () => {
    it("should inject parent service to child type", () => {
      // should inject `ParentService` in `ChildComponent` without raising an error
      const { field, query } = renderComponent({
        type: "parent",
        fieldGroup: [
          {
            type: "child",
            fieldGroup: [{ key: "email", type: "input" }],
          },
        ],
      });

      const childInstance: FormlyChildComponent = query("formly-child")
        .componentInstance;

      expect(childInstance.parent).not.toBeNull();
      expect(childInstance.wrapper).toBeNull();
    });

    it("should inject parent wrapper to child type", () => {
      const { field, query } = renderComponent({
        wrappers: ["form-field-async"],
        templateOptions: { render: true },
        fieldGroup: [
          {
            type: "child",
            fieldGroup: [{ key: "email", type: "input" }],
          },
        ],
      });

      // should inject `FormlyWrapperLabel` in `ChildComponent` without raising an error
      const childInstance: FormlyChildComponent = query("formly-child")
        .componentInstance;

      expect(childInstance.wrapper).not.toBeNull();
      expect(childInstance.parent).toBeNull();
    });
  });
});

@Component({
  selector: "formly-wrapper-form-field-async",
  template: `
    <div *ngIf="to.render">
      <ng-container #fieldComponent></ng-container>
    </div>
  `,
})
class FormlyWrapperFormFieldAsync extends FieldWrapper {}

@Component({
  selector: "formly-on-push-component",
  template: `
    <div class="to">{{ to | json }}</div>
    <div class="formState">{{ formState | json }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyOnPushComponent extends FieldType {}

@Injectable()
export class ParentService {}

@Component({
  selector: "formly-parent",
  template: `
    <formly-field *ngFor="let f of field.fieldGroup" [field]="f"></formly-field>
  `,
  providers: [ParentService],
})
export class FormlyParentComponent extends FieldType {
  constructor(public parent: ParentService) {
    super();
  }
}

@Component({
  selector: "formly-child",
  template: ` <ng-content></ng-content> `,
})
export class FormlyChildComponent extends FieldType {
  constructor(
    @Optional() public parent: ParentService,
    @Optional() public wrapper: FormlyWrapperFormFieldAsync
  ) {
    super();
  }
}
