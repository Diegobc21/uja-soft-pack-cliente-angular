import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {SoftwareComponent} from "./pages/software/software.component";
import {CategoryComponent} from "./pages/category/category.component";

const routes: Routes = [
  {
    path: 'home',
    component: MainComponent
  },
  {
    path: 'software/:name',
    component: SoftwareComponent
  },
  {
    path: 'category/:name',
    component: CategoryComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
