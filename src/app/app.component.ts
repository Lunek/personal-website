import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { filter } from 'rxjs';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    private _navigationService: NavigationService
  ) {
    router.events
      .pipe(filter((e): e is Scroll => e instanceof Scroll))
      .subscribe((e) => {
        const doRedirect =
          router.getCurrentNavigation()?.extras.state?.['doRedirect'] ?? true;

        if (e.anchor && doRedirect) {
          this._navigationService.scrolling = true;
          this.viewportScroller.scrollToAnchor(e.anchor ? e.anchor : '');
        }
      });
  }

  ngOnInit() {}

  scrollFunction(section: string): void {
    this.router.navigate(['/'], { fragment: section });
  }
}
