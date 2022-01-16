import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { API_URL } from '../assets/constants/constants';
import { IChef, IDish, IRestaurant, IServerResponse } from '../assets/models';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RestaurantsService {
    @Output() serverResponseEvent = new EventEmitter<IServerResponse>();
    @Output() restaurantsUpdateEvent = new EventEmitter<IRestaurant[]>();

    restaurants: IRestaurant[] = [];
    readonly API = API_URL.restaurants;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.fetchRestaurants();
    }

    fetchRestaurants() {
        this.http.get(this.API, this.authService.authorizationHeader).subscribe({
            next: this.fetchRestaurantsHandler.bind(this),
            error: this.errorHandler.bind(this)
        })
    }

    fetchRestaurantsHandler(restaurants: IRestaurant[]) {
        console.log("Restaurants", restaurants)
        this.restaurants = restaurants;
        this.restaurantsUpdateEvent.emit(this.restaurants);
    }

    updateRestaurant(restaurant: IRestaurant) {
        this.http.put(`${this.API}/${restaurant._id}`, restaurant, this.authService.authorizationHeader).subscribe({
            next: this.updateRestaurantHandler.bind(this),
            error: this.errorHandler.bind(this)
        })
    }

    updateRestaurantHandler(responseRestaurant: IRestaurant) {
        console.log("response put restaurant", responseRestaurant);

        const updatedRestaurantIndex = this.restaurants.findIndex(restaurant => restaurant._id === responseRestaurant._id);

        this.restaurants[updatedRestaurantIndex] = responseRestaurant;
        this.restaurantsUpdateEvent.emit(this.restaurants);
        this.serverResponseEvent.emit({ valid: true, httpMethodRequest: "PUT" });
    }

    postRestaurant(restaurant: IRestaurant) {
        console.log("postRestaurant", restaurant)
        this.http.post(this.API, restaurant, this.authService.authorizationHeader).subscribe({
            next: this.postRestaurantHandler.bind(this),
            error: this.errorHandler.bind(this)
        })
    }

    postRestaurantHandler(responseRestaurant: IRestaurant) {
        console.log("response post restaurant", responseRestaurant);
        this.restaurants.push(responseRestaurant);
        this.restaurantsUpdateEvent.emit(this.restaurants);
        this.serverResponseEvent.emit({ valid: true, httpMethodRequest: "POST" });
    }

    deleteRestaurant(id: string) {
        this.http.delete(`http://127.0.0.1:3000/restaurants/${id}`, this.authService.authorizationHeader).subscribe({
            next: this.deleteRestaurantHandler.bind(this),
            error: this.errorHandler.bind(this)
        })
    }

    deleteRestaurantHandler(response: { message: string, id: string }) {
        console.log("response delete restaurant", response);
        const deletedRestaurantIndex = this.restaurants.findIndex(restaurant => restaurant._id === response.id);

        this.restaurants.splice(deletedRestaurantIndex, 1);
        this.restaurantsUpdateEvent.emit(this.restaurants);
        this.serverResponseEvent.emit({ valid: true, httpMethodRequest: "DELETE" });
    }

    errorHandler(err) {
        console.log("restaurant service errorHandler", err);
        const serverResponse: IServerResponse = {
            valid: false,
            message: err.error,
        }

        switch (err.status) {
            case 403:
                this.authService.onAccessForbidden();
                break;
            default:
                this.serverResponseEvent.emit(serverResponse);
        }

    }
}