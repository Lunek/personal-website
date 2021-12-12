import { Component, OnInit } from '@angular/core';
import { Logger } from 'src/app/services/logger.service';
import { VisibilityService } from 'src/app/services/visibility.service';

const log = new Logger("ShellComponent");

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  constructor(private _visibilityService: VisibilityService) {}

  ngOnInit(): void {}

  _visibilityChangeHandler($event: boolean, section: number): void {
    log.info(`Handled visibilityChangedEvent. Section ${section} visibility ${$event}`);
    this._visibilityService.updateVisibility(section, $event);
  }
}
