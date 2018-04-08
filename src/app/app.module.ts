import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { VideoComponent } from './video/video.component';

import { Repository } from './models/repository';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [Repository],
  bootstrap: [AppComponent]
})
export class AppModule { }
