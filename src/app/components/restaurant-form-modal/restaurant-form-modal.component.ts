import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IChef, IRestaurant } from 'src/app/assets/models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChefsService } from 'src/app/services/chefs.service';


@Component({
  selector: 'app-restaurant-form-modal',
  templateUrl: './restaurant-form-modal.component.html',
  styleUrls: ['./restaurant-form-modal.component.scss']
})
export class RestaurantFormModalComponent implements OnInit, AfterViewInit {
  @Input() editRestaurant: IRestaurant;
  @ViewChild('form') form: NgForm;
  @Output() onSubmitted = new EventEmitter<IRestaurant>();
  chefs: IChef[];

  editMode = false;
  title = "New Restaurant"
  submitButtonText = "Create";


  constructor(public activeModal: NgbActiveModal, private chefsService: ChefsService) {
    
  }

  ngOnInit(): void {
    console.log("onInit", this.editRestaurant, this.chefs);
    this.chefs = this.chefsService.chefs;

    if (this.editRestaurant) {
      this.editMode = true;
      this.title = "Edit Restaurant";
      this.submitButtonText = "Save";
    }
  }

  onSubmit() {
    if (this.form.valid) {
      let chefToEmit = { ...this.form.form.value };

      if (this.editMode)
        chefToEmit._id = this.editRestaurant._id;

      console.log("Restaurant To Emit", chefToEmit);
      this.onSubmitted.emit(chefToEmit);
      this.activeModal.close();
    }
  }


  ngAfterViewInit() {
    console.log("afterViewInit", this.editRestaurant);

    if (this.editMode)
      this.setFormData();
  }

  setFormData() {
    const { name, imageUrl, popularRestaurant } = this.editRestaurant;

    setTimeout(() => {
      this.form.setValue({
        name: name,
        chef: this.editRestaurant.chef ? this.editRestaurant.chef._id : '',
        imageUrl: imageUrl ? imageUrl : '',
        popularRestaurant: popularRestaurant ? popularRestaurant : false
      });
    });
  }

}
