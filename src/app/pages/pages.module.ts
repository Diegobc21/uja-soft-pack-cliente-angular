import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {SoftwareComponent} from './software/software.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    MainComponent,
    SoftwareComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MainComponent,
    SoftwareComponent,
    CategoryComponent
  ]
})
export class PagesModule {
}
