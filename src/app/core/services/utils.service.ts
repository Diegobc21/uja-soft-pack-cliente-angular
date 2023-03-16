import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  constructor(private router: Router) {
  }

  /**
   * Función que devuelve el nombre de la aplicación
   */
  get appName(): string {
    return environment.appName;
  }

  /**
   * Función que realiza la navegación hacia la página principal
   */
  public goToMainPage(): void {
    this.router.navigate(['home']).then();
  }

  /**
   * Función que realiza la navegación hacia la página de categoría
   *
   * @param name: nombre de la categoría
   */
  public goToCategoryPage(name: string): void {
    this.router.navigate(['category/' + name]).then();
  }

  /**
   * Función que realiza la navegación hacia la página de software
   *
   * @param name: nombre del software
   */
  public goToSoftwarePage(name: string): void {
    this.router.navigate(['software/' + name]).then();
  }

  /**
   * Función para copiar texto al portapapeles del dispositivo
   *
   * @param textToCopy: texto a copiar
   */
  public copyToClipBoard(textToCopy: string): void {
    if (!navigator.clipboard) {
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.style.display = 'none';
      selBox.value = textToCopy;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      // @ts-ignore
      selBox.execCommand('copy');
      document.body.removeChild(selBox);
    } else {
      navigator.clipboard.writeText(textToCopy).then(() => undefined);
    }
  }

}
