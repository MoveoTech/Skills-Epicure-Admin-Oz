import { Component, OnInit } from '@angular/core';
import { IRestaurant } from 'src/app/assets/models';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  restaurants: IRestaurant[];
  constructor(private restaurantsService: RestaurantsService) { }

  ngOnInit(): void {
    this.restaurantsService.restaurantsUpdateEvent.subscribe((restaurants: IRestaurant[]) => {
      this.restaurants = restaurants;
    })
  }

}
