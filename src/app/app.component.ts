import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
  FormlyFieldConfig,
  FormlyFormOptions,
} from "../app/idynamic-form/core/src/lib/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  fields: FormlyFieldConfig[] = [
    {
      key: "text",
      type: "input",
      templateOptions: {
        label: "Text",
        placeholder: "Formly is terrific!",
        required: true,
      },
    },
    {
      key: "nested.story",
      type: "textarea",
      templateOptions: {
        label: "Some sweet story",
        placeholder:
          "It allows you to build and maintain your forms with the ease of JavaScript :-)",
        description: "",
      },
      expressionProperties: {
        focus: "formState.awesomeIsForced",
        "templateOptions.description": (model, formState) => {
          if (formState.awesomeIsForced) {
            return "And look! This field magically got focus!";
          }
        },
      },
    },
    {
      key: "awesome",
      type: "checkbox",
      templateOptions: { label: "" },
      expressionProperties: {
        "templateOptions.disabled": "formState.awesomeIsForced",
        "templateOptions.label": (model, formState) => {
          if (formState.awesomeIsForced) {
            return "Too bad, formly is really awesome...";
          } else {
            return "Is formly totally awesome? (uncheck this and see what happens)";
          }
        },
      },
    },
    {
      key: "whyNot",
      type: "textarea",
      expressionProperties: {
        "templateOptions.placeholder": (model, formState) => {
          if (formState.awesomeIsForced) {
            return "Too bad... It really is awesome! Wasn't that cool?";
          } else {
            return "Type in here... I dare you";
          }
        },
        "templateOptions.disabled": "formState.awesomeIsForced",
      },
      hideExpression: "model.awesome",
      templateOptions: {
        label: "Why Not?",
        placeholder: "Type in here... I dare you",
      },
    },
    {
      className: "optional-className",
      type: "radio",
      key: "radioKey",
      templateOptions: {
        label: "This is a label;",
        labelProp: "This is labelProp",
        valueProp: "id",
        theme: "default",
        options: [
          {
            value: "Yes",
            id: true,
          },
          {
            value: "No",
            id: false,
          },
        ],
      },
    },
    {
      className: "optional",
      type: "input",
      key: "inputSomewhatKey",
      templateOptions: {
        label: "This is my beautiful label",
        required: true,
        theme: "default",
        labelProp: "value",
        valueProp: "id",
        options: [
          { value: "value two", id: "1" },
          { value: "value one", id: "2" },
        ],
      },
      hideExpression: "!model.radioKey",
    },
  ];

  submit() {
    if (this.form.valid) {
      // alert(JSON.stringify(this.model));
      console.log(this.model);
    }
  }
}
