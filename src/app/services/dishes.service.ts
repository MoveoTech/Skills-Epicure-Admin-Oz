import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { API_URL } from '../assets/constants/constants';
import { IChef, IDish } from '../assets/models';

@Injectable({ providedIn: 'root' })
export class DishesService {
    dishesUpdateEvent = new EventEmitter<IDish[]>();

    dishes: IDish[] = [];
    // readonly API_URL = API_URL.chefs;

    constructor(private http: HttpClient) {
        this.fetchDishes();
    }

    fetchDishes() {
        //need to check why using API_URL.chefs not working
        this.http.get('http://127.0.0.1:3000/dishes').subscribe((dishes: IDish[]) => {
            console.log("Dishes", dishes)
            this.dishes = dishes;
            this.dishesUpdateEvent.emit(this.dishes);
        })
    }

    updateDish(dish: IDish) {
        //need to check why using API_URL.chefs not working
        this.http.put(`http://127.0.0.1:3000/dishes/${dish._id}`, dish).subscribe((responseDish: IDish) => {
            console.log("response put dish", responseDish);
            this.fetchDishes();
        })
    }

    postDish(dish: IDish) {
        //need to check why using API_URL.chefs not working
        this.http.post('http://127.0.0.1:3000/dishes', dish).subscribe((responseDish: IDish) => {
            console.log("response post dish", responseDish);
            this.fetchDishes();
        })
    }

    deleteDish(id: string) {
        //need to check why using API_URL.chefs not working
        this.http.delete(`http://127.0.0.1:3000/dishes/${id}`).subscribe((response: string) => {
            console.log("response delete dish", response);
            this.fetchDishes();
        })
    }
}