import { Component, OnInit, AfterContentInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IDish, IServerResponse } from 'src/app/assets/models';
import { DishFormModalComponent } from 'src/app/components/dish-form-modal/dish-form-modal.component';
import { AuthService, RestaurantsService } from 'src/app/services';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit, AfterContentInit {
  dishes: IDish[] = [];
  dishFormModal: {
    submitSubscription: Subscription,
    deleteSubscription: Subscription,
  } = {
      submitSubscription: undefined,
      deleteSubscription: undefined,
    };
    
  constructor(private dishesService: DishesService, private restaurantsService: RestaurantsService, private modalService: NgbModal, private authService: AuthService) {
    this.restaurantsService.serverResponseEvent.subscribe(response => this.serverResponseHandler(response));
  }

  ngOnInit(): void {
    this.dishesService.dishesUpdateEvent.subscribe(dishes => {
      this.dishes = dishes;
    })
  }

  ngAfterContentInit() {
    this.setDishes();
  }

  setDishes() {
    this.dishes = this.dishesService.dishes;
  }

  openModal(dishIndex?: number) {
    const activeModalRef = this.modalService.open(DishFormModalComponent);
    const dishActiveModal = activeModalRef.componentInstance as DishFormModalComponent;
    dishActiveModal.serverSubmitResponseEvent = this.dishesService.serverResponseEvent;


    dishActiveModal.restaurants = this.restaurantsService.restaurants;
    dishActiveModal.dishTypes = this.dishesService.dishTypes;
    if (dishIndex !== undefined)
      dishActiveModal.editDish = this.dishes[dishIndex];

    this.dishFormModal.submitSubscription = dishActiveModal.onSubmitEvent.subscribe(dish => {
      console.log("dish after submitted", dish);
      this.dishSubmitHandler(dish);
    })

    this.dishFormModal.deleteSubscription = dishActiveModal.onDeleteEvent.subscribe(dish => {
      console.log("dish to delete ", dish);
      this.dishDeleteHandler(dish);
    })
  }

  dishSubmitHandler(dish: IDish) {
    if (dish._id)
      this.dishesService.updateDish(dish);
    else
      this.dishesService.postDish(dish);
  }

  dishDeleteHandler(dish: IDish) {
    this.dishesService.deleteDish(dish._id);
  }

  logout() {
    this.authService.logout();
  }

  serverResponseHandler(response: IServerResponse) {
    if (response.valid) {
      this.dishFormModal.submitSubscription.unsubscribe();
      this.dishFormModal.deleteSubscription.unsubscribe();
    }
  }

}
