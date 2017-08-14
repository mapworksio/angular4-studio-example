import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WidgetComponent } from './widget.component';

@NgModule({
  declarations: [
    WidgetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [WidgetComponent]
})
export class WidgetModule { }
