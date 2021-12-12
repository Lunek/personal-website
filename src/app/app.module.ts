import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InView } from './in-view.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, InView],
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }), AppRoutingModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
