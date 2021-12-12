import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from './logger.service';

const log = new Logger('NavigationService');

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _isScrolling: boolean;

  constructor(private router: Router) {
    this._isScrolling = false;
  }

  updateFragment(fragment: string, withRedirect: boolean = true) {
    log.info(`Updating fragment: ${fragment} with redirect: ${withRedirect}`);
    // we are scrolling right now, we don't need check visibility for that period of time
    if (withRedirect) {
      this.scrolling = true;
    }
    // navigate to default path with correct url
    this.router.navigate(['/'], {
      fragment,
      state: { doRedirect: withRedirect },
    });
  }

  get scrolling() {
    return this._isScrolling;
  }

  set scrolling(value: boolean) {
    if (value) {
      setTimeout(() => (this.scrolling = false), 500); // 500ms may be too much
    }
    this._isScrolling = value;
  }
}
