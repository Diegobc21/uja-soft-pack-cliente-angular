import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DownloadService {

  private readonly COMMAND: string = '\nwinget install -e --id=';
  private readonly FILE_NAME: string = 'USP-Software.bat';
  private readonly FILE_TYPE: string = 'data:urlList/plain;charset=utf-8,';

  constructor() {
    // TODO: document why this constructor is empty
  }

  downloadAll(softwareList: string[]): void {
    if (softwareList.length === 0) {
      return;
    }

    let element = document.createElement('a');
    element.style.display = 'none';

    let scriptContent: string = '';

    while (softwareList.length > 0) {
      scriptContent += this.COMMAND + softwareList.pop();
    }

    element.setAttribute('download', this.FILE_NAME);
    element.setAttribute('href', this.FILE_TYPE
      + encodeURIComponent(scriptContent));

    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

}
