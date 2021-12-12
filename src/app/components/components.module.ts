import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WelcomeComponent } from './welcome/welcome.component'
import { EducationComponent } from './education/education.component'
import { AboutComponent } from './about/about.component'
import { ShellComponent } from './shell/shell.component'
import { DirectivesModule } from '../directives/directives.module'
import { VisibilityService } from '../services/visibility.service'
import { NavigationService } from '../services/navigation.service'

@NgModule({
  imports: [CommonModule, DirectivesModule],
  declarations: [WelcomeComponent, EducationComponent, AboutComponent, ShellComponent],
  providers: [NavigationService, VisibilityService],
  exports: [ShellComponent]
})
export class ComponentsModule {}
