import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  constructor(private router: Router) {
  }

  get appName(): string {
    return environment.appName;
  }

  public goToMainPage(): void {
    this.router.navigate(['home']).then();
  }

  public goToCategoryPage(name: string): void {
    this.router.navigate(['category/' + name]).then();
  }

  public goToSoftwarePage(name: string): void {
    this.router.navigate(['software/' + name]).then();
  }

}
