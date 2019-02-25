import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BusynessModule, LoaderType } from 'projects/busyness/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BusynessModule.forRoot({
      loaderType: LoaderType.BALL_SCALE_MULTIPLE
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
