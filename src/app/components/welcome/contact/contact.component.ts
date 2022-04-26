import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor() { }

  downloadResume() {
    const url = `${window.location.origin}/assets/files/cv.pdf`;
    console.error(url);
    window.open(url, '_blank');
  }
}
