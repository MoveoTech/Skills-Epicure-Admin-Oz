import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { API_URL } from '../assets/constants/constants';
import { IChef, IServerResponse } from '../assets/models';
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })
export class ChefsService {
    @Output() serverResponseEvent = new EventEmitter<IServerResponse>();
    @Output() chefsUpdateEvent = new EventEmitter<IChef[]>();

    readonly API = API_URL.chefs;

    chefs: IChef[] = [];

    constructor(private http: HttpClient, private authService: AuthService) {
        console.log("chefs constructor");
        this.fetchChefs();
    }

    fetchChefs() {
         this.http.get(this.API, this.authService.authorizationHeader).subscribe({
            next: this.fetchChefsHandler.bind(this),
            error: this.errorHandler.bind(this)
        })
    }

    fetchChefsHandler(chefs: IChef[]) {
        console.log("fetchChefsHandler", chefs);
        this.chefs = chefs;
        this.chefsUpdateEvent.emit(this.chefs);
    }

    updateChef(chef: IChef) {
        this.http.put(`${this.API}/${chef._id}`, chef, this.authService.authorizationHeader).subscribe({
            next: this.updateChefHandler.bind(this),
            error: this.errorHandler.bind(this)
        })
    }

    updateChefHandler(responseChef: IChef) {
        console.log("response put chef", responseChef);
        this.chefs.forEach(chef => {
            if (chef._id === responseChef._id)
                chef = responseChef;
        })
        this.chefsUpdateEvent.emit(this.chefs);
        this.serverResponseEvent.emit({ valid: true, httpMethodRequest: "PUT" });
    }

    postChef(chef: IChef) {
        this.http.post(this.API, chef, this.authService.authorizationHeader).subscribe({
            next: this.postChefHandler.bind(this),
            error: this.errorHandler.bind(this)
        });

    }

    postChefHandler(responseChef: IChef) {
        console.log("response post chef", responseChef);
        this.chefs.push(responseChef);
        this.chefsUpdateEvent.emit(this.chefs);
        this.serverResponseEvent.emit({ valid: true, httpMethodRequest: "POST" });
    }

    deleteChef(chef: IChef) {
        this.http.delete(`${this.API}/${chef._id}`, this.authService.authorizationHeader).subscribe({
            next: this.deleteChefHandler.bind(this),
            error: this.errorHandler.bind(this)
        })
    }

    deleteChefHandler(response: string) {
        console.log("response delete chef", response);
        this.serverResponseEvent.emit({ valid: true, httpMethodRequest: "DELETE" });
        this.fetchChefs();
    }

    errorHandler(err) {
        console.log("errorHandler", err);
        const serverResponse: IServerResponse = {
            valid: false,
            message: err.error,
        }

        switch (err.status) {
            case 403:
                console.log("chefs service error handler access forbidden")
                this.authService.onAccessForbidden();
                break;
            default:
                this.serverResponseEvent.emit(serverResponse);
        }

    }
}

