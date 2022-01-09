import { Component, OnInit, AfterContentInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDish } from 'src/app/assets/models';
import { DishFormModalComponent } from 'src/app/components/dish-form-modal/dish-form-modal.component';
import { AuthService } from 'src/app/services';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit, AfterContentInit {
  dishes: IDish[] = [];
  constructor(private dishesService: DishesService, private modalService: NgbModal, private authService: AuthService) { }

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

    if (dishIndex !== undefined)
      dishActiveModal.editDish = this.dishes[dishIndex];

    const submitSubscription = dishActiveModal.onSubmitEvent.subscribe(dish => {
      console.log("dish after submitted", dish);
      this.dishSubmitHandler(dish);
      submitSubscription.unsubscribe();
    })

    const deleteSubscription = dishActiveModal.onDeleteEvent.subscribe(dish => {
      console.log("dish to delete ", dish);
      this.dishDeleteHandler(dish);
      deleteSubscription.unsubscribe();
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

}
