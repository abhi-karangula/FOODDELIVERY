/**
 * author: Pandu Ranga Rao
 */

import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IRestaurant } from './restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  imageWidth: number = 50;
  imageMargin: number = 2;
  restaurants: IRestaurant[];
  filters = {
    fastDelivery: false,
    vegetarian: false,
    offers: false
  };
  errorMessage: string;
  constructor(private route: ActivatedRoute, private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.getRestaurantsByLocation();
  }

  getRestaurantsByLocation() {
    let id = this.route.snapshot.paramMap.get('location');
    this.restaurantService.getRestaurantsByLocation(id).subscribe(
      restaurants => this.restaurants = restaurants,
      error => this.errorMessage = <any>error
    );
  }

  onBack(): void {
    this.router.navigate(['/home']);
  }

  onFilterSelect() {
    let id = this.route.snapshot.paramMap.get('location');
    if (this.filters.fastDelivery || this.filters.vegetarian || this.filters.offers) {
      this.restaurantService.applyFilters(this.filters, id).subscribe(
        restaurants => this.restaurants = restaurants,
        error => this.errorMessage = <any>error
      );
    } else {
      this.getRestaurantsByLocation();
    }

  }

}
