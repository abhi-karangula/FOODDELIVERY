import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantComponent } from './restaurant.component';

const routes: Routes = [
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'restaurant/:location', component: RestaurantComponent },
  { path: '', redirectTo: 'restaurant', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
