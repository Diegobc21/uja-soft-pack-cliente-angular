import {Component, OnDestroy, OnInit} from '@angular/core';
import {SoftwareService} from "../../core/services/software.service";
import {ActivatedRoute} from "@angular/router";
import {Software} from "../../core/interfaces/software.interface";
import {DownloadService} from "../../core/services/download.service";
import {Subscription} from "rxjs";
import {UtilsService} from "../../core/services/utils.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  public softwareList: Software[] = [];
  public categoryList: string[] = [];
  // Lista que contendrá el winget ID del software a descargar
  public downloadList: string[] = [];

  private _subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService,
    private softwareService: SoftwareService,
    private downloadService: DownloadService
  ) {
  }

  get appName(): string {
    return this.utilsService.appName;
  }

  public ngOnInit() {
    this.startSubscriptions();
  }

  /**
   * Función para actualizar la selección del software
   *
   * @param software Objeto software a añadir/eliminar
   */
  public checkboxChange(software: Software): void {
    if (this.downloadList.includes(software.winget_id)) {
      const index = this.downloadList.indexOf(software.winget_id);
      this.downloadList.splice(index, 1);
    } else {
      this.downloadList.push(software.winget_id);
    }
  }

  /**
   * Función para indicar si la lista de software está vacía
   *
   * @returns boolean
   */
  public selectionIsEmpty(): boolean {
    return this.downloadList.length === 0;
  }

  /**
   * Función para descargar el listado seleccionado de software
   *
   * @param event Evento de ratón
   */
  public downloadAll(event: MouseEvent) {
    event.preventDefault();
    this.downloadService.downloadAll(this.downloadList.slice());
  }

  public goToSoftwarePage(softwareName: string): void {
    if (softwareName) {
      this.utilsService.goToSoftwarePage(softwareName);
      this.resetAll();
    }
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  private startSubscriptions() {
    this._subscriptions.push(
      this.softwareService.getCategories().subscribe(categoryList => {
        this.categoryList = categoryList;
        this._subscriptions.push(
          this.softwareService.getSoftware().subscribe(softwareList => {
              if (softwareList) {
                this.softwareList = softwareList;
              }
            }
          )
        );
      })
    );
  }

  private resetAll(): void {
    this.softwareList = [];
    this.downloadList = [];
    this.categoryList = [];
  }

}
