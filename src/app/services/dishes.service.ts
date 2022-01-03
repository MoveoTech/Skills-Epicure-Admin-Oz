import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { API_URL } from '../assets/constants/constants';
import { IChef, IDish } from '../assets/models';

@Injectable({ providedIn: 'root' })
export class DishesService {
    dishesUpdateEvent = new EventEmitter<IDish[]>();

    private dishes: IDish[] = [];
    // readonly API_URL = API_URL.chefs;

    constructor(private http: HttpClient) {
        this.getDishes();
    }

    getDishes() {
        //need to check why using API_URL.chefs not working
        this.http.get('http://127.0.0.1:3000/dishes').subscribe((dishes: IDish[]) => {
            console.log("Dishes", dishes)
            this.dishes = dishes;
            this.dishesUpdateEvent.emit(this.dishes);
        })
    }
}