import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AutofocusDirective } from './autofocus.directive';
import { AppComponent } from './app.component';
import { BitmapComponent } from './bitmap/bitmap.component';

@NgModule({
  declarations: [
    AppComponent,
    BitmapComponent,
    AutofocusDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
