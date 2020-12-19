import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  Renderer2,
  DoCheck,
  Inject,
  OnDestroy,
} from "@angular/core";
import { DynamicFieldConfig, DynamicTemplateOptions } from "../models";
import {
  defineHiddenProp,
  DYNAMICFORM_VALIDATORS,
  observe,
  IObserver,
} from "../utils";
import { DOCUMENT } from "@angular/common";

@Directive({
  selector: "[dynamicformAttributes]",
  host: {
    "(focus)": "onFocus($event)",
    "(blur)": "onBlur($event)",
    "(change)": "onChange($event)",
  },
})
export class DynamicAttributes implements OnChanges, DoCheck, OnDestroy {
  @Input("dynamicformAttributes") field: DynamicFieldConfig;
  @Input() id: string;

  private document: Document;
  private uiAttributesCache: any = {};
  private uiAttributes = [
    ...DYNAMICFORM_VALIDATORS,
    "tabindex",
    "placeholder",
    "readonly",
    "disabled",
    "step",
  ];
  private focusObserver: IObserver<boolean>;

  private uiEvents = {
    listeners: [],
    events: ["click", "keyup", "keydown", "keypress"],
  };

  get to(): DynamicTemplateOptions {
    return this.field.templateOptions || {};
  }

  private get fieldAttrElements(): ElementRef[] {
    return (this.field && this.field["_elementRefs"]) || [];
  }

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) _document: any
  ) {
    this.document = _document;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.field) {
      this.field.name && this.setAttribute("name", this.field.name);
      this.uiEvents.listeners.forEach((listener) => listener());
      this.uiEvents.events.forEach((eventName) => {
        if (this.to && this.to[eventName]) {
          this.uiEvents.listeners.push(
            this.renderer.listen(
              this.elementRef.nativeElement,
              eventName,
              (e) => this.to[eventName](this.field, e)
            )
          );
        }
      });

      if (this.to && this.to.attributes) {
        observe(
          this.field,
          ["templateOptions", "attributes"],
          ({ currentValue, previousValue }) => {
            if (previousValue) {
              Object.keys(previousValue).forEach((attr) =>
                this.removeAttribute(attr)
              );
            }

            if (currentValue) {
              Object.keys(currentValue).forEach((attr) =>
                this.setAttribute(attr, currentValue[attr])
              );
            }
          }
        );
      }

      this.detachElementRef(changes.field.previousValue);
      this.attachElementRef(changes.field.currentValue);
      if (this.fieldAttrElements.length === 1) {
        !this.id && this.field.id && this.setAttribute("id", this.field.id);
        this.focusObserver = observe<boolean>(
          this.field,
          ["focus"],
          ({ currentValue }) => {
            this.toggleFocus(currentValue);
          }
        );
      }
    }

    if (changes.id) {
      this.setAttribute("id", this.id);
    }
  }

  ngDoCheck() {
    this.uiAttributes.forEach((attr) => {
      const value = this.to[attr];
      if (this.uiAttributesCache[attr] !== value) {
        this.uiAttributesCache[attr] = value;
        if (value || value === 0) {
          this.setAttribute(attr, value === true ? attr : `${value}`);
        } else {
          this.removeAttribute(attr);
        }
      }
    });
  }

  ngOnDestroy() {
    this.uiEvents.listeners.forEach((listener) => listener());
    this.detachElementRef(this.field);
    this.focusObserver && this.focusObserver.unsubscribe();
  }

  toggleFocus(value: boolean) {
    const element = this.fieldAttrElements ? this.fieldAttrElements[0] : null;
    if (!element || !element.nativeElement.focus) {
      return;
    }

    const isFocused =
      !!this.document.activeElement &&
      this.fieldAttrElements.some(
        ({ nativeElement }) =>
          this.document.activeElement === nativeElement ||
          nativeElement.contains(this.document.activeElement)
      );

    if (value && !isFocused) {
      element.nativeElement.focus();
    } else if (!value && isFocused) {
      element.nativeElement.blur();
    }
  }

  onFocus($event: any) {
    this.focusObserver && this.focusObserver.setValue(true);
    if (this.to.focus) {
      this.to.focus(this.field, $event);
    }
  }

  onBlur($event: any) {
    this.focusObserver && this.focusObserver.setValue(false);
    if (this.to.blur) {
      this.to.blur(this.field, $event);
    }
  }

  onChange($event: any) {
    if (this.to.change) {
      this.to.change(this.field, $event);
    }

    if (this.field.formControl) {
      this.field.formControl.markAsDirty();
    }
  }

  private attachElementRef(f: DynamicFieldConfig) {
    if (!f) {
      return;
    }

    if (
      f["_elementRefs"] &&
      f["_elementRefs"].indexOf(this.elementRef) === -1
    ) {
      f["_elementRefs"].push(this.elementRef);
    } else {
      defineHiddenProp(f, "_elementRefs", [this.elementRef]);
    }
  }

  private detachElementRef(f: DynamicFieldConfig) {
    const index =
      f && f["_elementRefs"]
        ? this.fieldAttrElements.indexOf(this.elementRef)
        : -1;
    if (index !== -1) {
      this.field["_elementRefs"].splice(index, 1);
    }
  }

  private setAttribute(attr: string, value: string) {
    this.renderer.setAttribute(this.elementRef.nativeElement, attr, value);
  }

  private removeAttribute(attr: string) {
    this.renderer.removeAttribute(this.elementRef.nativeElement, attr);
  }
}
