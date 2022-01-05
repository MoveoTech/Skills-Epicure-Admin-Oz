import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { IDish, IDishType, IRestaurant } from 'src/app/assets/models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-dish-form-modal',
  templateUrl: './dish-form-modal.component.html',
  styleUrls: ['./dish-form-modal.component.scss']
})
export class DishFormModalComponent implements OnInit {
  @Input() editDish: IDish;
  @ViewChild('form') form: NgForm;
  @Output('onSubmit') onSubmitEvent = new EventEmitter<IDish>();
  @Output('onDelete') onDeleteEvent = new EventEmitter<IDish>();
  restaurants: IRestaurant[];
  dishTypes: IDishType[];

  editMode = false;
  title = "New Dish"
  submitButtonText = "Create";

  constructor(public activeModal: NgbActiveModal, private restaurantsService: RestaurantsService, private dishesService: DishesService) { }

  ngOnInit(): void {
    console.log("onInit", this.editDish, this.restaurants);
    this.restaurants = this.restaurantsService.restaurants;
    this.dishTypes = this.dishesService.dishTypes;

    if (this.editDish) {
      this.editMode = true;
      this.title = "Edit Dish";
      this.submitButtonText = "Save";
    }
  }

  ngAfterViewInit() {
    console.log("afterViewInit", this.editDish);
    if (this.editMode)
      this.setFormData();
  }


  onSubmit() {
    if (this.form.valid) {
      const dish = this.getFormData();
      console.log("Dish to emit", dish);
      this.onSubmitEvent.emit(dish);
      this.activeModal.close();
    }
  }

  getFormData() {
    let formData = { ...this.form.form.value };
    formData.type = this.getTypeIdArray(formData.type);

    if (this.editMode)
      formData._id = this.editDish._id;

    return formData;
  }

  setFormData() {
    const { name, restaurant, components, imageUrl, price, type, signatureDish } = this.editDish;
    const formTypes = this.getTypeFormArray(type);

    setTimeout(() => {
      this.form.setValue({
        name: name,
        restaurant: restaurant ? restaurant._id : '',
        components: components ? components : '',
        imageUrl: imageUrl ? imageUrl : '',
        price: price ? price : '',
        type: formTypes,
        signatureDish: signatureDish ? signatureDish : false
      });
    });
  }

  getTypeFormArray(types: IDishType[]) {
    const formTypes = {};
    this.dishTypes.forEach(type => formTypes[`${type.value}`] = false);

    types.forEach(type => formTypes[`${type.value}`] = true)

    return formTypes;
  }

  getTypeIdArray(formTypes: { [key: string]: boolean }) {
    const typesId: string[] = [];
    
    this.dishTypes.forEach(type => {
      if(formTypes[`${type.value}`])
        typesId.push(type._id)
    } );

    return typesId;
  }

  deleteItem() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Item!",
      icon: "warning",
      buttons: ["Cancel", "Ok"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.onDeleteEvent.emit(this.editDish);

          swal(`"${this.editDish.name}" has been deleted!`, {
            icon: "success",
          });
          this.activeModal.close();
        }
      });
  }

}
