import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {UtilsService} from "../../core/services/utils.service";
import {Subscription} from "rxjs";
import {SoftwareService} from "../../core/services/software.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {

  public categoryList: string[] = [];

  private _subscription: Subscription | null = null;
  private _navbarToggler: HTMLElement | null = null;

  constructor(private softwareService: SoftwareService,
              public utilsService: UtilsService) {
  }

  get appName(): string {
    return this.utilsService.appName;
  }

  public ngAfterViewInit() {
    this._navbarToggler = document.getElementById('navbar-toggler');
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
    this.toggleNavbar();
    this.utilsService.goToCategoryPage(category);
  }

  public ngOnDestroy() {
    this._subscription?.unsubscribe();
  }

  /**
   * Función para cerrar la barra de navegación si está desplegada
   */
  public toggleNavbar(): void {
    if (this._navbarToggler) {
      if (!this.isNavbarTogglerCollapsed()) {
        this._navbarToggler.click();
      }
    }
  }

  /**
   * Función que indica si la barra de navegación está o no desplegada
   *
   * @returns true: si la barra está comprimida
   * @returns false: si la barra está desplegada
   */
  public isNavbarTogglerCollapsed(): boolean {
    if (this._navbarToggler) {
      return this._navbarToggler?.classList.contains('collapsed');
    }
    return false;
  }

  private startSubscriptions(): void {
    this.softwareService.getCategories().subscribe(value => {
      this.categoryList = value
    })
  }

}
