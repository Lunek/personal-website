import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  constructor() {}

  public downloadResume() {
    const url = `${window.location.origin}/assets/files/cv.pdf`;
    console.error(url);
    window.open(url, '_blank');
  }
}
