import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IRestaurant } from './restaurant';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  imageWidth: number = 50;
  imageMargin: number = 2;
  restaurants: IRestaurant[];
  locations: any[];
  location: string;
  filters = {
    fastDelivery: false,
    vegetarian: false,
    offers: false
  };
  errorMessage: string;
  constructor(private route: ActivatedRoute, private router: Router, private restaurantService: RestaurantService, private commonService: CommonService) { }

  ngOnInit() {
    let routeLocation = this.route.snapshot.paramMap.get('location');
    if (routeLocation) {
      this.location = routeLocation;
      this.getRestaurantsByLocation();
    }
    this.commonService.getLocations().subscribe(
      locations => this.locations = locations,
      errors => this.errorMessage = errors
    );
  }

  getRestaurantsByLocation() {
    this.restaurantService.getRestaurantsByLocation(this.location).subscribe(
      restaurants => this.restaurants = restaurants,
      error => this.errorMessage = <any>error
    );
  }

  onBack(): void {
    this.router.navigate(['/home']);
  }

  onFilterSelect() {
    if (this.filters.fastDelivery || this.filters.vegetarian || this.filters.offers) {
      this.restaurantService.applyFilters(this.filters, this.location).subscribe(
        restaurants => this.restaurants = restaurants,
        error => this.errorMessage = <any>error
      );
    } else {
      this.getRestaurantsByLocation();
    }

  }

}
