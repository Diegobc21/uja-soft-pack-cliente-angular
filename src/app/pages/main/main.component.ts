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
  public wingetList: string[] = [];

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
   * @param software: objeto software a añadir/eliminar
   */
  public checkboxChange(software: Software): void {
    if (this.wingetList.includes(software.winget_id)) {
      const index = this.wingetList.indexOf(software.winget_id);
      this.wingetList.splice(index, 1);
    } else {
      this.wingetList.push(software.winget_id);
    }
  }

  public selectionIsEmpty(): boolean {
    return this.wingetList.length === 0;
  }

  public downloadAll(event: MouseEvent) {
    event.preventDefault();
    this.downloadService.downloadAll(this.wingetList.slice());
  }

  public gotoSoftware(name: string): void {
    if (name) {
      this.utilsService.goToSoftwarePage(name);
      this.resetAll();
    }
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  private startSubscriptions() {
    this._subscriptions.push(
      this.softwareService.getCategories().subscribe(value => {
        this.categoryList = value;
        this._subscriptions.push(
          this.softwareService.getSoftware().subscribe(softwareResponse =>
            this.softwareList = softwareResponse
          )
        );
      })
    );
  }

  private resetAll(): void {
    this.softwareList = [];
    this.wingetList = [];
    this.categoryList = [];
  }

}
