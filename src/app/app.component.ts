import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ChefsService } from './services/chefs.service';
import { DishesService } from './services/dishes.service';
import { RestaurantsService } from './services/restaurants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Epicure-Admin';
  isLogIn: boolean;

  constructor(private authService: AuthService, private router: Router) {

    this.isLogIn = authService.isAuthenticated();
    console.log("app this.isLogIn", this.isLogIn);

    this.authService.onTokenValidityChange.subscribe((valid) => {
      console.log("app component onTokenValidityChange", valid);
      this.isLogIn = valid;

      if (this.isLogIn)
        this.router.navigate(['/']);
      else
        this.router.navigate(['/login']);
    })
  }
}
