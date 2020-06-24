import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {A2Edatetimepicker} from 'ng2-eonasdan-datetimepicker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    A2Edatetimepicker
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
