import { EventEmitter, Injectable } from '@angular/core';
import { getSectionByIndex } from '../helpers/sections.enum';
import { Logger } from './logger.service';
import { NavigationService } from './navigation.service';

const log = new Logger('VisibilityService');

@Injectable({
  providedIn: 'root',
})
export class VisibilityService {
  // Array to save data about components visibility
  private visibilityTracker: boolean[];

  public onVisibilityChanged: EventEmitter<boolean> = new EventEmitter();

  constructor(private _navigationService: NavigationService) {
    this.visibilityTracker = Array.from({ length: 3 }).map((el) => false);
  }

  updateVisibility(componentIndex: number, state: boolean): void {
    log.info(`Updating visibility for component ${componentIndex} to ${state}`);
    this.visibilityTracker[componentIndex] = state;

    // if we reveiced true and we are not scrolling right now
    if (!this._navigationService.scrolling) {
      this.checkThatFragmentInUrlHasToBeUpdated();
    }
  }

  checkThatFragmentInUrlHasToBeUpdated() {
    //Get the first component that is shown
    const indexOfFirstShownComponent = this.visibilityTracker.indexOf(true);

    //Get all component before the first shown component
    const componentsBeforeShown = this.visibilityTracker.slice(
      0,
      indexOfFirstShownComponent
    );

    //If all these elements are not visible, we have to change fragment in url
    if (componentsBeforeShown.every((el) => el === false)) {
      this._navigationService.updateFragment(
        getSectionByIndex(indexOfFirstShownComponent),
        false
      );
    }
  }
}
