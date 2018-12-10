import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string = 'FoodDelivery';
  errorMessage: string;
  locations: any[];
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.getLocations().subscribe(
      locations => this.locations = locations,
      errors => this.errorMessage = errors
    );
  }

}
