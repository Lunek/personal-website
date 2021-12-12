import { ViewportScroller } from '@angular/common';
import { AbstractType, Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Scroll } from '@angular/router';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private isScrolling: boolean = false;
  private expectedSection: string = '';

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    private route: ActivatedRoute
  ) {
    this.route.fragment.subscribe((frag) => {
      if (
        frag &&
        frag === this.expectedSection
      )
      {
        console.log('RESETTING ISSCROLLING', frag, this.expectedSection);
        setTimeout(() => this.isScrolling = false, 500);
      }
    });

    router.events
      .pipe(filter((e): e is Scroll => e instanceof Scroll))
      .subscribe((e) => {
        console.log(e);

        let doRedirect = true;
        if (
          router
            .getCurrentNavigation()
            ?.extras.state?.hasOwnProperty('doRedirect')
        ) {
          doRedirect =
            router.getCurrentNavigation()?.extras.state?.['doRedirect'];
        }

        if (e.anchor) {
          if (doRedirect) {
            setTimeout(() => {
              viewportScroller.scrollToAnchor(e.anchor ? e.anchor : '');
            }, 0);
          }
        } else {
          // forward navigation
          setTimeout(() => {
            viewportScroller.scrollToPosition([0, 0]);
          }, 0);
        }
      });
  }

  ngOnInit() {}

  scrollFunction(section: string): void {
    this.isScrolling = true;
    this.expectedSection = section;
    this.router.navigate(['/'], { fragment: section });
  }

  private visibilityTracker = Array.from({ length: 5 }).map((el) => false);

  _visibilityChangeHandler($event: boolean, section: number): void {
    console.log(`Section '${section} is now ${$event}'`);
    this.visibilityTracker[section - 1] = $event;

    const indexOfTruthSection = this.visibilityTracker.indexOf(true);

    const arrayBelowTruthElement = this.visibilityTracker.slice(
      0,
      indexOfTruthSection
    );

    if (
      arrayBelowTruthElement.every((el) => el === false) &&
      !this.isScrolling
    ) {
      this.router.navigate(['/'], {
        fragment: `section${indexOfTruthSection + 1}`,
        state: { doRedirect: false },
      });
    }
  }
}
