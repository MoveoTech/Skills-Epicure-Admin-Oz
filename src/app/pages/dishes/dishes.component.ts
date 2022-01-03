import { Component, OnInit, AfterContentInit } from '@angular/core';
import { IDish } from 'src/app/assets/models';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit, AfterContentInit {
  dishes: IDish[] = [];
  constructor(private dishesService: DishesService) { }

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

}
