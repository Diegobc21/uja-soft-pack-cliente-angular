import {Component, OnDestroy, OnInit} from '@angular/core';
import {Software} from "../../core/interfaces/software.interface";
import {ActivatedRoute} from "@angular/router";
import {SoftwareService} from "../../core/services/software.service";
import {Subscription} from "rxjs";
import {UtilsService} from "../../core/services/utils.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  public softwareList: Software[] = [];
  public categoryName: string | null = null;

  private _subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService,
    private softwareService: SoftwareService
  ) {
  }

  public ngOnInit(): void {
    this.startSubscriptions();
  }

  public goToHomePage(): void {
    this.utilsService.goToMainPage();
  }

  public gotoSoftware(name: string): void {
    this.utilsService.goToSoftwarePage(name);
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  private startSubscriptions() {
    this._subscriptions.push(
      this.activatedRoute.paramMap.subscribe(routeParams => {
          this.categoryName = routeParams.get('name')
          if (this.categoryName !== null) {
            this._subscriptions.push(
              this.softwareService.getByCategoryName(this.categoryName)
                .subscribe(software => {
                    if (software) {
                      this.softwareList = software;
                    }
                  }
                ));
          } else {
            this.goToHomePage();
          }
        }
      ));
  }

}
