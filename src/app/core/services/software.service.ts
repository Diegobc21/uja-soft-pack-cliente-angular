import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Software} from "../interfaces/software.interface";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SoftwareService {

  private readonly _url: string = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.getCategories();
  }

  public getSoftware(): Observable<Software[]> {
    return this.http.get<Software[]>(this._url + '/software');
  }

  public getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this._url + '/software/categories');
  }

  public getByName(softwareName: string): Observable<Software> {
    return this.http.get<Software>(this._url + '/software/' + softwareName);
  }

  public getByCategoryName(categoryName: string): Observable<Software[]> {
    return this.http.get<Software[]>(this._url + '/software?category=' + categoryName);
  }

}
