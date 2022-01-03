import { Routes } from "@angular/router";
import { ChefsComponent } from "../../pages/chefs/chefs.component";
import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { DishesComponent } from "../../pages/dishes/dishes.component";
import { RestaurantsComponent } from "../../pages/restaurants/restaurants.component";
import { HomeComponent } from "src/app/pages/home/home.component";
 

export const api = "http://127.0.01:3000";
export const API_URL = {
    root: api,
    dishes: api + "/dishes",
    restaurants: api + "/restaurants",
    chefs: api.concat("/chefs"),
    signatureDishes: api + "/signatureDishes",
    popularRestaurants: api + "/popularRestaurants",
    chefOfTheWeek: api + "/chefOfTheWeek",
};

export const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'dishes', component: DishesComponent },
    { path: 'restaurants', component: RestaurantsComponent },
    { path: 'chefs', component: ChefsComponent },
    // { path: 'login', component: LoginComponent }
];