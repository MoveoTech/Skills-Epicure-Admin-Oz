import { Component, OnInit, AfterContentInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IRestaurant, IServerResponse } from 'src/app/assets/models';
import { RestaurantFormModalComponent } from 'src/app/components/restaurant-form-modal/restaurant-form-modal.component';
import { AuthService, ChefsService } from 'src/app/services';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit, AfterContentInit {
  restaurants: IRestaurant[];
  restaurantFormModal: {
    submitSubscription: Subscription,
    deleteSubscription: Subscription,
  } = {
      submitSubscription: undefined,
      deleteSubscription: undefined,
    };

  constructor(private restaurantsService: RestaurantsService,
    private modalService: NgbModal,
    private authService: AuthService,
    private chefsService: ChefsService) {
    this.restaurantsService.restaurantsUpdateEvent.subscribe((restaurants: IRestaurant[]) => {
      this.restaurants = restaurants;
    });
    this.restaurantsService.serverResponseEvent.subscribe(response => this.serverResponseHandler(response));
  }

  ngOnInit(): void {
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

    restaurantActiveModal.serverSubmitResponseEvent = this.restaurantsService.serverResponseEvent;
    restaurantActiveModal.chefs = this.chefsService.chefs;
    
    if (restaurantIndex !== undefined)
      restaurantActiveModal.editRestaurant = this.restaurants[restaurantIndex];

    this.restaurantFormModal.submitSubscription = restaurantActiveModal.onSubmitEvent.subscribe(restaurant => {
      console.log("restaurant after submitted", restaurant);
      this.restaurantSubmittedHandler(restaurant);
    })

    this.restaurantFormModal.deleteSubscription = restaurantActiveModal.onDeleteEvent.subscribe(restaurant => {
      console.log("restaurant to delete ", restaurant);
      this.restaurantDeleteHandler(restaurant);
    });
  }

  restaurantSubmittedHandler(restaurant: IRestaurant) {
    console.log("restaurantSubmittedHandler")
    if (restaurant._id)
      this.restaurantsService.updateRestaurant(restaurant);
    else
      this.restaurantsService.postRestaurant(restaurant);
  }

  restaurantDeleteHandler(restaurant: IRestaurant) {
    this.restaurantsService.deleteRestaurant(restaurant._id);
  }

  serverResponseHandler(response: IServerResponse) {
    if (response.valid) {
      this.restaurantFormModal.submitSubscription.unsubscribe();
      this.restaurantFormModal.deleteSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
  }
}
