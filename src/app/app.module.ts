import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DishesComponent } from './pages/dishes/dishes.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { ChefsComponent } from './pages/chefs/chefs.component';
import { APP_ROUTES } from './assets/constants/constants';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    DishesComponent,
    RestaurantsComponent,
    ChefsComponent,
    SideBarComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
