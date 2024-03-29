import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Software} from "../../core/interfaces/software.interface";
import {SoftwareService} from "../../core/services/software.service";
import {Subscription} from "rxjs";
import {UtilsService} from "../../core/services/utils.service";

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit, OnDestroy {

  public copiedToClipboard: boolean = false;
  public softwareName: string | null = null;

  private _software: Software | undefined;
  private _subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private utilsService: UtilsService,
              private softwareService: SoftwareService) {
  }

  get software(): Software | undefined {
    return this._software;
  }

  public ngOnInit(): void {
    this.startSubscriptions();
  }

  public copyToClipboard(): void {
    // Se extrae del DOM el texto completo a copiar
    const textToCopy = <string>document.getElementById('winget')?.innerText;

    this.utilsService.copyToClipBoard(textToCopy);

    this.copiedToClipboard = true;
  }

  public goBack(): void {
    this.utilsService.goToMainPage();
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  private startSubscriptions() {
    this._subscriptions.push(this.activatedRoute.paramMap.subscribe(routeParams => {
      this.softwareName = routeParams.get('name');
      if (this.softwareName !== null) {
        this._subscriptions.push(
          this.softwareService.getByName(this.softwareName)
            .subscribe(software => {
              if (software) {
                this._software = software;
              } else {
                this.goBack();
              }
            }));
      } else {
        this.goBack();
      }
    }));
  }

}
