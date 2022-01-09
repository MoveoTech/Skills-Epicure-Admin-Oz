import { Routes } from "@angular/router";
import { ChefsComponent } from "../../pages/chefs/chefs.component";
import { DishesComponent } from "../../pages/dishes/dishes.component";
import { RestaurantsComponent } from "../../pages/restaurants/restaurants.component";
import { LoginComponent } from "src/app/pages/login/login.component";
import { AuthGuard, LoginGuard } from "src/app/services";



export const api = "http://127.0.0.1:3000";
export const API_URL = {
    root: api,
    login: api + "/login",
    dishes: api + "/dishes",
    restaurants: api + "/restaurants",
    chefs: api + "/chefs",
    signatureDishes: api + "/signatureDishes",
    popularRestaurants: api + "/popularRestaurants",
    chefOfTheWeek: api + "/chefOfTheWeek",
};

export const APP_ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'chefs' },
    { path: 'dishes', component: DishesComponent, canActivate: [AuthGuard] },
    { path: 'restaurants', component: RestaurantsComponent, canActivate: [AuthGuard] },
    { path: 'chefs', component: ChefsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent,canActivate:[LoginGuard] }
];