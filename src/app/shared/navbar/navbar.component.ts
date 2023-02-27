import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilsService} from "../../core/services/utils.service";
import {Subscription} from "rxjs";
import {SoftwareService} from "../../core/services/software.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public categoryList: string[] = [];

  private _subscription: Subscription | null = null;
  private _navbarToggler: HTMLElement | null = document.getElementById('navbar-toggler');

  constructor(private softwareService: SoftwareService,
              private utilsService: UtilsService) {
  }

  get appName(): string {
    return this.utilsService.appName;
  }

  public ngOnInit() {
    this.startSubscriptions();
  }

  public goToMainPage(event: MouseEvent): void {
    event.preventDefault();
    this.toggleNavbar();
    this.utilsService.goToMainPage();
  }

  public goToCategoryView(category: string): void {
    this.utilsService.goToCategoryPage(category);
  }

  public toggleNavbar(): void {
    if (this.isNavbarTogglerCollapsed()) {
      this._navbarToggler!.click();
    }
  }

  public isNavbarTogglerCollapsed(): boolean {
    if (this._navbarToggler != null) {
      return this._navbarToggler?.classList.contains('collapsed');
    }
    return false;
  }

  public ngOnDestroy() {
    this._subscription?.unsubscribe();
  }

  private startSubscriptions(): void {
    this.softwareService.getCategories().subscribe(value => {
      this.categoryList = value
    })
  }

}
