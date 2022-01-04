import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { API_URL } from '../assets/constants/constants';
import { IChef } from '../assets/models';

@Injectable({ providedIn: 'root' })
export class ChefsService {
    chefsUpdateEvent = new EventEmitter<IChef[]>();

    chefs: IChef[] = [];
    private chefOfTheWeek: IChef = undefined;
    // readonly API_URL = API_URL.chefs;

    constructor(private http: HttpClient) {
        this.getChefs();
    }

    getChefs() {
        //need to check why using API_URL.chefs not working
        this.http.get('http://127.0.0.1:3000/chefs').subscribe((chefs: IChef[]) => {
            console.log("Chefs", chefs)
            this.chefs = chefs;
            this.chefsUpdateEvent.emit(this.chefs);
        })
    }

    updateChef(chef: IChef) {
        //need to check why using API_URL.chefs not working

        this.http.put(`http://127.0.0.1:3000/chefs/${chef._id}`, chef).subscribe((responseChef: IChef[]) => {
            console.log("response put chef", responseChef);
            this.getChefs();
        })
    }

    postChef(chef: IChef) {
        //need to check why using API_URL.chefs not working
        this.http.post('http://127.0.0.1:3000/chefs', chef).subscribe((responseChef: IChef[]) => {
            console.log("response post chef", responseChef);
            this.getChefs();
        })
    }
}