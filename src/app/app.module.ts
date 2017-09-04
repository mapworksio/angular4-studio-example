import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WidgetComponent } from './widget.component';
import { AwesomeComponent } from './awesome.component';

@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent,
    AwesomeComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [
    WidgetComponent,
    AwesomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
