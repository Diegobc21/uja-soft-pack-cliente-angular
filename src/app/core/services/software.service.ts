import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Software} from "../interfaces/software.interface";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SoftwareService {

  // Endpoint del servidor
  private readonly _url: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * Función que devuelve la colección de objetos software completamente
   */
  public getSoftware(): Observable<Software[]> {
    return this.http.get<Software[]>(this._url + '/software');
  }

  /**
   * Función que devuelve todas las categorías existentes en la colección software
   */
  public getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this._url + '/software/categories');
  }

  /**
   * Función que devuelve un objeto software utilizando su nombre como parámetro
   *
   * @param softwareName: nombre del software
   */
  public getByName(softwareName: string): Observable<Software> {
    return this.http.get<Software>(this._url + '/software/' + softwareName);
  }

  /**
   * Función que devuelve un vector de objetos software utilizando una categoría como parámetro
   *
   * @param categoryName: nombre de la categoría
   */
  public getByCategoryName(categoryName: string): Observable<Software[]> {
    return this.http.get<Software[]>(this._url + '/software?category=' + categoryName);
  }

}
