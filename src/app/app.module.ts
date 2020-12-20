import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicModule } from "./idynamic-form/core/src/lib/core";
import { DynamicSelectModule } from "./idynamic-form/core/select";
import { DynamicBootstrapModule } from "./idynamic-form/ui/bootstrap/src/lib/bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormlyFieldNgSelect } from "./types/ng-select.type";

@NgModule({
  declarations: [AppComponent, FormlyFieldNgSelect],
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
          component: FormlyFieldNgSelect,
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
  entryComponents: [FormlyFieldNgSelect],
})
export class AppModule {}
