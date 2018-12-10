import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { RestaurantService } from '../restaurant/restaurant.service';
import { IRestaurant } from '../restaurant/restaurant';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailsService {

  constructor(private http: HttpClient, private restaurantService: RestaurantService) { }

  getRestaurantItems(name: string, location: string): Observable<IRestaurant[]> {
    return this.restaurantService.getRestaurants().pipe(
      map((restaurants: IRestaurant[]) => restaurants.find((r) => r.location.indexOf(location) != -1) && restaurants.filter((r) => r.name.indexOf(name) != -1))
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
