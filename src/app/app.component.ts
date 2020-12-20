import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
  DynamicFieldConfig,
  DynamicFormOptions,
} from "../app/idynamic-form/core/src/lib/core";

import { of as observableOf } from "rxjs";

const states = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District Of Columbia",
  "Federated States Of Micronesia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Marshall Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Palau",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Islands",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  form = new FormGroup({});
  model: any = {};
  /* options: DynamicFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  }; */
  options = {
    formState: {
      selectedModel: this.model,
    },
  };

  /**sample for examples */
  /*   fields: DynamicFieldConfig[] = [
    {
      key: "text",
      type: "input",
      templateOptions: {
        label: "Text",
        placeholder: "Dynamic is terrific!",
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
  ]; */

  /* iselect example 1 */
  /* fields: DynamicFieldConfig[] = [
    {
      key: "user",
      type: "ng-select",
      templateOptions: {
        required: true,
        placeholder: "Select a user:",
        options: [
          { id: 1, fistname: "foo", lastname: "1" },
          { id: 2, fistname: "foo", lastname: "2" },
          { id: 3, fistname: "bar", lastname: "1" },
          { id: 4, fistname: "bar", lastname: "2" },
        ],
        valueProp: "id",
        labelProp: (opt) => `${opt.fistname} ${opt.lastname}`,
      },
    },
  ]; */

  /*iselect type ahead example */
  /*  fields: DynamicFieldConfig[] = [
    {
      key: "name",
      type: "input",
      templateOptions: {
        label: "",
        required: true,
      },
    },
    {
      key: "state",
      type: "typeahead",
      templateOptions: {
        required: true,
        placeholder: "Search for a state:",
        search$: (term) => {
          if (!term || term === "") {
            return observableOf(states);
          }

          return observableOf(
            states
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
          );
        },
      },
    },
  ]; */

  /*sample SRA form */
  fields: DynamicFieldConfig[] = [
    {
      key: "cde",
      type: "typeahead",
      templateOptions: {
        required: true,
        placeholder: "Search for a CDE:",
        search$: (term) => {
          if (!term || term === "") {
            return observableOf(states);
          }
          return observableOf(
            states
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
          );
        },
      },
    },
    {
      key: "selectedRowConstant",
      type: "radio",
      templateOptions: {
        type: "radio",
        label: "",
        required: true,
        name: "selectedRowConstant",
        options: [
          {
            value: "exclude",
            label: "Exclude Rows By Constant",
            key: "excludeRowConstant",
          },
          {
            value: "include",
            label: "Include Rows By Constant",
            key: "includeRowConstant",
          },
        ],
      },
    },
    {
      key: "country",
      className: "my-custom-style mb-5",
      type: "input",
      templateOptions: {
        label: "field 2",
        placeholder: "",
      },
      hideExpression: (model: any, formState: any) => {
        // access to the main model can be through `this.model` or `formState` or `model
        if (
          formState.selectedModel &&
          formState.selectedModel.selectedRowConstant
        ) {
          return formState.selectedModel.selectedRowConstant === "exclude";
        }
        return true;
      },
    },
    {
      key: "user",
      className: "my-custom-style mt-5",
      type: "ng-select-header",
      templateOptions: {
        required: true,
        placeholder: "Select a user:",
        options: [
          { id: 1, fistname: "foo", lastname: "1" },
          { id: 2, fistname: "foo", lastname: "2" },
          { id: 3, fistname: "bar", lastname: "1" },
          { id: 4, fistname: "bar", lastname: "2" },
        ],
        valueProp: "id",
        labelProp: (opt) => `${opt.fistname} ${opt.lastname}`,
      },
    },
  ];

  submit() {
    if (this.form.valid) {
      // alert(JSON.stringify(this.model));
      console.log(this.model);
    }
  }
}
