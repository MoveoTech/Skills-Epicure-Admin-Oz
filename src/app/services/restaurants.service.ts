import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { API_URL } from '../assets/constants/constants';
import { IChef, IDish, IRestaurant } from '../assets/models';

@Injectable({ providedIn: 'root' })
export class RestaurantsService {
    restaurantsUpdateEvent = new EventEmitter<IRestaurant[]>();

    restaurants: IRestaurant[] = [];
    // readonly API_URL = API_URL.chefs;
    constructor(private http: HttpClient) {
        this.getRestaurants();
    }

    getRestaurants() {
        //need to check why using API_URL.chefs not working
        this.http.get('http://127.0.0.1:3000/restaurants').subscribe((restaurants: IRestaurant[]) => {
            console.log("Restaurants", restaurants)
            this.restaurants = restaurants;
            this.restaurantsUpdateEvent.emit(this.restaurants);
        })
    }

    updateRestaurant(restaurant: IRestaurant) {
        //need to check why using API_URL.chefs not working
        this.http.put(`http://127.0.0.1:3000/restaurants/${restaurant._id}`, restaurant).subscribe((responseRestaurant: IRestaurant) => {
            console.log("response put restaurant", responseRestaurant);
            this.getRestaurants();
        })
    }

    postRestaurant(restaurant: IRestaurant) {
        //need to check why using API_URL.chefs not working
        this.http.post('http://127.0.0.1:3000/restaurants', restaurant).subscribe((responseRestaurant: IRestaurant) => {
            console.log("response post restaurant", responseRestaurant);
            this.getRestaurants();
        })
    }
}