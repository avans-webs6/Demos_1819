import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DragulaModule } from 'ng2-dragula';
import { BarsComponent } from './bars/bars.component';
import { BarsPipe } from './bars/bars.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BarsComponent,
    BarsPipe
  ],
  //app.module.ts
  imports: [ BrowserModule, DragulaModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
