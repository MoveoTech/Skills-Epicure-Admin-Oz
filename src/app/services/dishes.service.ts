import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { API_URL } from '../assets/constants/constants';
import { IChef, IDish, IDishType } from '../assets/models';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class DishesService {
    dishesUpdateEvent = new EventEmitter<IDish[]>();

    readonly API = API_URL.dishes;
    private httpRequestConfig = {
        headers: { authorization: '' }
    };
    dishes: IDish[] = [];
    dishTypes: IDishType[] = [];


    constructor(private http: HttpClient, private authService: AuthService) {
        this.fetchDishes();
        this.fetchDishTypes();
    }

    fetchDishes() {
        //need to check why using API_URL.chefs not working
        this.http.get(this.API, this.authService.authorizationHeader).subscribe((dishes: IDish[]) => {
            console.log("Dishes", dishes)
            this.dishes = dishes;
            this.dishesUpdateEvent.emit(this.dishes);
        })
    }

    fetchDishTypes() {
        //need to check why using API_URL.chefs not working
        this.http.get('http://127.0.0.1:3000/dishes/types',this.authService.authorizationHeader).subscribe((dishTypes: IDishType[]) => {
            console.log("Dish types", dishTypes)
            this.dishTypes = dishTypes;
        })
    }

    updateDish(dish: IDish) {
        //need to check why using API_URL.chefs not working
        this.http.put(`http://127.0.0.1:3000/dishes/${dish._id}`, dish,this.authService.authorizationHeader).subscribe((responseDish: IDish) => {
            console.log("response put dish", responseDish);
            this.fetchDishes();
        })
    }

    postDish(dish: IDish) {
        //need to check why using API_URL.chefs not working
        this.http.post('http://127.0.0.1:3000/dishes', dish,this.authService.authorizationHeader).subscribe((responseDish: IDish) => {
            console.log("response post dish", responseDish);
            this.fetchDishes();
        })
    }

    deleteDish(id: string) {
        //need to check why using API_URL.chefs not working
        this.http.delete(`http://127.0.0.1:3000/dishes/${id}`,this.authService.authorizationHeader).subscribe((response: string) => {
            console.log("response delete dish", response);
            this.fetchDishes();
        })
    }
}