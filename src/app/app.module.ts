import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BusynessModule, LoaderType } from 'projects/busyness/src/public_api';
import { HttpClientModule } from '@angular/common/http';
import { MaterialImplModule } from './shared/materia-impl.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BusynessModule.forRoot({
      loaderType: LoaderType.BALL_SCALE_MULTIPLE
    }),
    HttpClientModule,
    MaterialImplModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
