import { Component, OnInit, AfterContentInit } from '@angular/core';
import { IRestaurant } from 'src/app/assets/models';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit, AfterContentInit {
  restaurants: IRestaurant[];
  constructor(private restaurantsService: RestaurantsService) { }

  ngOnInit(): void {
    this.restaurantsService.restaurantsUpdateEvent.subscribe((restaurants: IRestaurant[]) => {
      this.restaurants = restaurants;
    })
  }

  ngAfterContentInit() {
    this.setRestaurants();
  }

  setRestaurants() {
    this.restaurants = this.restaurantsService.restaurants;
  }

}
