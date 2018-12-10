import { NgModule } from '@angular/core';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantComponent } from './restaurant.component';
import { ItemDetailsModule } from '../item-details/item-details.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RestaurantComponent],
  imports: [
    RestaurantRoutingModule,
    ItemDetailsModule
  ],
  exports: [
    RestaurantRoutingModule,
    CommonModule,
    FormsModule
  ],
})
export class RestaurantModule { }
