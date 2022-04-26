import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education/education.component';
import { AboutComponent } from './about/about.component';
import { ShellComponent } from './shell/shell.component';
import { DirectivesModule } from '../directives/directives.module';
import { VisibilityService } from '../services/visibility.service';
import { NavigationService } from '../services/navigation.service';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeModule } from './welcome/welcome.module';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    HttpClientModule,
    WelcomeModule
  ],
  declarations: [
    EducationComponent,
    AboutComponent,
    ShellComponent,
    HeaderComponent,
  ],
  providers: [NavigationService, VisibilityService],
  exports: [ShellComponent],
})
export class ComponentsModule {}
