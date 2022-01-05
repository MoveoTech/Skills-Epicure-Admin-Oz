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
import { ChefFormModalComponent } from './components/chef-form-modal/chef-form-modal.component';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RestaurantFormModalComponent } from './components/restaurant-form-modal/restaurant-form-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    DishesComponent,
    RestaurantsComponent,
    ChefsComponent,
    SideBarComponent,
    NavBarComponent,
    ChefFormModalComponent,
    RestaurantFormModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
