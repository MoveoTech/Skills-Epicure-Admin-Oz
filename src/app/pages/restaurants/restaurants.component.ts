import { Component, OnInit, AfterContentInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IRestaurant } from 'src/app/assets/models';
import { RestaurantFormModalComponent } from 'src/app/components/restaurant-form-modal/restaurant-form-modal.component';
import { AuthService } from 'src/app/services';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit, AfterContentInit {
  restaurants: IRestaurant[];
  constructor(private restaurantsService: RestaurantsService, private modalService: NgbModal,private authService:AuthService) { }

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

  openModal(restaurantIndex?: number) {
    const activeModalRef = this.modalService.open(RestaurantFormModalComponent);
    const restaurantActiveModal = activeModalRef.componentInstance as RestaurantFormModalComponent;

    if (restaurantIndex !== undefined)
      restaurantActiveModal.editRestaurant = this.restaurants[restaurantIndex];

    const subscription = restaurantActiveModal.onSubmitEvent.subscribe(restaurant => {
      console.log("restaurant after submitted", restaurant);
      this.restaurantSubmittedHandler(restaurant);
      subscription.unsubscribe();
    })

    const deleteSubscription = restaurantActiveModal.onDeleteEvent.subscribe(restaurant => {
      console.log("restaurant to delete ", restaurant);
      this.restaurantDeleteHandler(restaurant);
      deleteSubscription.unsubscribe();
    });
  }

  restaurantSubmittedHandler(restaurant: IRestaurant) {
    if (restaurant._id)
      this.restaurantsService.updateRestaurant(restaurant);
    else
      this.restaurantsService.postRestaurant(restaurant);
  }

  restaurantDeleteHandler(restaurant: IRestaurant) {
    this.restaurantsService.deleteRestaurant(restaurant._id);
  }

  logout(){
    this.authService.logout();
  }
}
