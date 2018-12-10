import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { IRestaurant } from './restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private retaurantUrl = 'api/restaurants.json'
  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<IRestaurant[]> {
    return this.http.get<IRestaurant[]>(this.retaurantUrl).pipe(
      tap(data => console.log("All: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getRestaurantsByLocation(location: string): Observable<IRestaurant[]> {
    return this.getRestaurants().pipe(
      map((restaurants: IRestaurant[]) => restaurants.filter((r) => r.location.indexOf(location) != -1))
    );
  }

  applyFilters(filters: any, location: string): Observable<IRestaurant[]> {
    return this.getRestaurantsByLocation(location).pipe(
      map((restaurants: IRestaurant[]) => restaurants.filter((r) => {
        if (filters.fastDelivery && filters.vegetarian && filters.offers) {
          return r.deliveryTime <= 20 && r.isVegRest === filters.vegetarian && r.isOffersAvl === filters.offers;
        } else if (filters.fastDelivery && filters.vegetarian) {
          return r.deliveryTime <= 20 && r.isVegRest === filters.vegetarian;
        } else if (filters.fastDelivery && filters.offers) {
          return r.deliveryTime <= 20 && r.isOffersAvl === filters.offers;
        } else if (filters.vegetarian && filters.offers) {
          return r.isVegRest === filters.vegetarian && r.isOffersAvl === filters.offers;
        } else if (filters.fastDelivery) {
          return r.deliveryTime <= 20;
        } else if (filters.vegetarian) {
          return r.isVegRest === filters.vegetarian;
        } else if (filters.offers) {
          return r.isOffersAvl === filters.offers;
        }
      }))
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
