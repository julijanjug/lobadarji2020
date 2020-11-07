import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { MapMbComponent } from './map-mb/map-mb.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    FloatingButtonComponent,
    MapMbComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
