import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { API_URL } from '../assets/constants/constants';
import { IChef, IDish, IDishType, IServerResponse } from '../assets/models';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class DishesService {
    @Output() serverResponseEvent = new EventEmitter<IServerResponse>();
    @Output() dishesUpdateEvent = new EventEmitter<IDish[]>();

    readonly API = API_URL.dishes;
    dishes: IDish[] = [];
    dishTypes: IDishType[] = [];

    constructor(private http: HttpClient, private authService: AuthService) {
        this.fetchDishes();
        this.fetchDishTypes();
    }

    fetchDishes() {
        this.http.get(this.API, this.authService.authorizationHeader).subscribe({
            next: this.fetchDishesHandler.bind(this),
            error: this.errorHandler.bind(this)
        })
    }

    fetchDishesHandler(dishes: IDish[]) {
        console.log("Dishes", dishes)
        this.dishes = dishes;
        this.dishesUpdateEvent.emit(this.dishes);
    }

    fetchDishTypes() {
        this.http.get(`${this.API}/types`, this.authService.authorizationHeader).subscribe({
            next: this.fetchDishTypesHandler.bind(this),
            error: this.errorHandler.bind(this)
        })
    }

    fetchDishTypesHandler(dishTypes: IDishType[]) {
        console.log("Dish types", dishTypes)
        this.dishTypes = dishTypes;
    }

    updateDish(dish: IDish) {
        this.http.put(`${this.API}/${dish._id}`, dish, this.authService.authorizationHeader).subscribe({
            next: this.updateDishHandler.bind(this),
            error: this.errorHandler.bind(this)
        })
    }

    updateDishHandler(responseDish: IDish) {
        console.log("response put dish", responseDish);
        this.fetchDishes();
    }

    postDish(dish: IDish) {
        this.http.post(this.API, dish, this.authService.authorizationHeader).subscribe({
            next: this.postDishHandler.bind(this),
            error: this.errorHandler.bind(this)
        })
    }

    postDishHandler(responseDish: IDish) {
        console.log("response post dish", responseDish);
        this.fetchDishes();
    }


    deleteDish(id: string) {
        this.http.delete(`${this.API}/${id}`, this.authService.authorizationHeader).subscribe({
            next: this.deleteDishHandler.bind(this),
            error: this.errorHandler.bind(this)
        })
    }

    deleteDishHandler(response: string) {
        console.log("response delete dish", response);
        this.fetchDishes();
    }

    errorHandler(err) {
        console.log("dish service errorHandler", err);
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