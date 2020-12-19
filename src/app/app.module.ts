import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicModule } from "./idynamic-form/core/src/lib/core";
import { DynamicBootstrapModule } from "./idynamic-form/ui/bootstrap/src/lib/bootstrap";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DynamicModule.forRoot(),
    DynamicBootstrapModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
