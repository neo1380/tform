import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicModule } from "./idynamic-form/core/src/lib/core";
import { DynamicSelectModule } from "./idynamic-form/core/select";
import { DynamicBootstrapModule } from "./idynamic-form/ui/bootstrap/src/lib/bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { DynamicFormNgSelect } from "./idynamic-form/core/src/lib/types/ng-select.type";
import { DynamicFormNgSelectHeader } from "./idynamic-form/core/src/lib/types/ng-select-type-with-header-template";
import { DynamicFormTypeahead } from "./idynamic-form/core/src/lib/types/typeahead.type.component";

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormNgSelect,
    DynamicFormTypeahead,
    DynamicFormNgSelectHeader,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DynamicSelectModule,
    NgSelectModule,
    AppRoutingModule,
    DynamicModule.forRoot({
      types: [
        {
          name: "ng-select",
          component: DynamicFormNgSelect,
          wrappers: ["form-field"],
        },
        {
          name: "typeahead",
          component: DynamicFormTypeahead,
          wrappers: ["form-field"],
        },
        {
          name: "ng-select-header",
          component: DynamicFormNgSelectHeader,
          wrappers: ["form-field"],
        },
      ],
      validationMessages: [
        { name: "required", message: "This field is required" },
      ],
    }),
    DynamicBootstrapModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DynamicFormNgSelect,
    DynamicFormTypeahead,
    DynamicFormNgSelectHeader,
  ],
})
export class AppModule {}
