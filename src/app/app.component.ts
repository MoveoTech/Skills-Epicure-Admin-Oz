import { Component } from '@angular/core';
import { ChefsService } from './services/chefs.service';
import { RestaurantsService } from './services/restaurants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Epicure-Admin';

  //chefsService declaration to fetch data when web start
  constructor( private chefsService: ChefsService, private restaurantsService: RestaurantsService){}
}
