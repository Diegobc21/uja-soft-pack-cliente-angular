import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DownloadService {

  // Script que instala el software mediante su ID de winget
  private readonly COMMAND: string = '\nwinget install -e --id=';

  // Nombre que tomará el archivo
  private readonly FILE_NAME: string = 'USP-Software.bat';

  // Tipo de archivo
  private readonly FILE_TYPE: string = 'data:urlList/plain;charset=utf-8,';

  constructor() {
    // TODO: document why this constructor is empty
  }

  //
  /**
   * Función que realiza y descarga el fichero con el script de descarga del software seleccionado
   *
   * @param softwareList: listado con el ID de winget de los programas a descargar
   */
  downloadAll(softwareList: string[]): void {
    if (softwareList.length === 0) {
      return;
    }

    // Se crea un enlace invisible en el DOM
    let element = document.createElement('a');
    element.style.display = 'none';

    let scriptContent: string = '';

    // Se completa el contenido del fichero
    while (softwareList.length > 0) {
      scriptContent += this.COMMAND + softwareList.pop();
    }

    element.setAttribute('download', this.FILE_NAME);
    element.setAttribute('href', this.FILE_TYPE
      + encodeURIComponent(scriptContent));

    document.body.appendChild(element);

    // Se ejecuta la descarga del enlace
    element.click();

    document.body.removeChild(element);
  }

}
