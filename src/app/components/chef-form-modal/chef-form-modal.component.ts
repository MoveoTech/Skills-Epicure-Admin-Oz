import { Component, Input, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @Output() onSubmitted = new EventEmitter<IChef>();

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

  onSubmit() {
    if (this.form.valid) {
      let chefToEmit = { ...this.form.form.value };

      if (this.editMode)
        chefToEmit._id = this.editChef._id;

      console.log("chefToEmit", chefToEmit);
      this.onSubmitted.emit(chefToEmit);
      this.activeModal.close();
    }
  }


  ngAfterViewInit() {
    console.log("afterViewInit", this.editChef);

    if (this.editMode)
      this.setFormData();
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

}
