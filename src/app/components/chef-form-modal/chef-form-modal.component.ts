import { Component, Input, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IChef } from 'src/app/assets/models';

@Component({
  selector: 'app-chef-modal',
  templateUrl: './chef-form-modal.component.html',
  styleUrls: ['./chef-form-modal.component.scss'],
})
export class ChefFormModalComponent implements OnInit, AfterViewInit {
  @Input() editChef: IChef;
  @ViewChild('form') form: NgForm;
  @Output('onSubmit') onSubmitEvent = new EventEmitter<IChef>();
  @Output('onDelete') onDeleteEvent = new EventEmitter<IChef>();

  editMode = false;
  title = "New Chef"
  submitButtonText = "Create";

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    console.log("onInit", this.editChef);

    if (this.editChef) {
      this.editMode = true;
      this.title = "Edit Chef";
      this.submitButtonText = "Save";
    }
  }

  ngAfterViewInit() {
    console.log("afterViewInit", this.editChef);

    if (this.editMode)
      this.setFormData();
  }

  onSubmit() {
    if (this.form.valid) {
      const chef = this.getFormData();

      console.log("chef To Emit", chef);
      this.onSubmitEvent.emit(chef);
      this.activeModal.close();
    }
  }

  getFormData() {
    let formData = { ...this.form.form.value };

    if (this.editMode)
      formData._id = this.editChef._id;

    return formData;
  }

  setFormData() {
    const { name, info, imageUrl, chefOfTheWeek } = this.editChef;

    setTimeout(() => {
      this.form.setValue({
        name: name,
        info: info ? info : '',
        imageUrl: imageUrl ? imageUrl : '',
        chefOfTheWeek: chefOfTheWeek ? chefOfTheWeek : false
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
          this.onDeleteEvent.emit(this.editChef);

          swal(`"${this.editChef.name}" has been deleted!`, {
            icon: "success",
          });
          this.activeModal.close();
        }
      });
  }

}
