import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { ContactComponent } from './contact/contact.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [WelcomeComponent, ContactComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule.forRoot(),
  ],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
