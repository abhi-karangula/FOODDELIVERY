import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemDetailsService } from './item-details.service';
import { IRestaurant } from '../restaurant/restaurant';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private itemDetailsService: ItemDetailsService) { }

  errorMessage: string;
  restaurant: IRestaurant;
  imageWidth: number = 200;
  imageMargin: number = 20;
  cartItems: any[] = [];
  subTotal: number = 0;
  ngOnInit() {
    this.getRestaurantItemsList();
  }

  getRestaurantItemsList() {
    let name = this.route.snapshot.paramMap.get('name');
    let location = this.route.snapshot.paramMap.get('location');
    this.itemDetailsService.getRestaurantItems(name, location).subscribe(
      restaurants => {
        this.restaurant = restaurants[0];
      },
      error => this.errorMessage = <any>error
    );
  }

  onBack(): void {
    this.router.navigate(['/restaurant', this.route.snapshot.paramMap.get('location')]);
  }

  addItemToCart(item): void {
    this.subTotal = (this.subTotal + item.price);
    let itemForCart = {
      item: item,
      quantity: 1
    }
    this.cartItems.push(itemForCart);
  }

  removeQnty(item) {
    this.subTotal = (this.subTotal - item.item.price);
    item.quantity = item.quantity - 1;
  }

  addQnty(item) {
    this.subTotal = (this.subTotal + item.item.price);
    item.quantity = item.quantity + 1;
  }

  onProceed() {
    if (this.cartItems.length > 0) {
      this.cartItems = [];
      alert('Your Order is placed successfully');
      this.router.navigate(['/home']);
    } else {
      alert('No items in your cart');
    }
  }

}
