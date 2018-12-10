import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { RestaurantModule } from '../restaurant/restaurant.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    HomeRoutingModule,
    RestaurantModule
  ]
})
export class HomeModule { }
