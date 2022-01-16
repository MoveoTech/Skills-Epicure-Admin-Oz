import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { IChef, IRestaurant, IServerResponse } from 'src/app/assets/models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChefsService } from 'src/app/services/chefs.service';


@Component({
  selector: 'app-restaurant-form-modal',
  templateUrl: './restaurant-form-modal.component.html',
  styleUrls: ['./restaurant-form-modal.component.scss']
})
export class RestaurantFormModalComponent implements OnInit, AfterViewInit {
  @Input() editRestaurant: IRestaurant;
  @Input() serverSubmitResponseEvent: EventEmitter<IServerResponse>;
  @ViewChild('form') form: NgForm;
  @Output('onSubmit') onSubmitEvent = new EventEmitter<IRestaurant>();
  @Output('onDelete') onDeleteEvent = new EventEmitter<IRestaurant>();
  chefs: IChef[];

  editMode = false;
  title = "New Restaurant";
  submitButtonText = "Create";

  constructor(public activeModal: NgbActiveModal, private chefsService: ChefsService) { }

  ngOnInit(): void {
    console.log("onInit", this.editRestaurant, this.chefs);
    this.chefs;

    if (this.editRestaurant) {
      this.editMode = true;
      this.title = "Edit Restaurant";
      this.submitButtonText = "Save";
    }
  }

  ngAfterViewInit() {
    console.log("afterViewInit", this.editRestaurant);

    if (this.serverSubmitResponseEvent)
      this.serverSubmitResponseEvent.subscribe(response => this.serverSubmitResponseHandler(response))

    if (this.editMode)
      this.setFormData();
  }

  serverSubmitResponseHandler(response: IServerResponse) {
    let responseText = '';
    if (response.valid) {
      switch (response.httpMethodRequest) {
        case "PUT":
          responseText = "Restaurant Updated!";
          break;
        case "POST":
          responseText = "New Restaurant Created!";
          break;
        case "DELETE":
          responseText = `"${this.editRestaurant.name}" has been deleted!`;
          break;
      }

      swal("Done!", responseText, "success");
      this.activeModal.close();
    }
    else
      swal("Error!", response.message, "error");
  }

  onSubmit() {
    if (this.form.valid) {
      const restaurant = this.getFormData();

      console.log("Restaurant To Emit", restaurant);
      this.onSubmitEvent.emit(restaurant);
    }
  }

  getFormData() {
    let formData = { ...this.form.form.value };

    if (this.editMode)
      formData._id = this.editRestaurant._id;

    return formData;
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
          this.onDeleteEvent.emit(this.editRestaurant);

          swal(`"${this.editRestaurant.name}" has been deleted!`, {
            icon: "success",
          });
          this.activeModal.close();
        }
      });
  }

}
