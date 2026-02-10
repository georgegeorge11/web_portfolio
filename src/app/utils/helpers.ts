import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Helpers {
  downloadFile() {
    const link = document.createElement('a');
    link.href = 'assets/George_Panfil_CV.pdf';
    link.download = 'George_Panfil_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
