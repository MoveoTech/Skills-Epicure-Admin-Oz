import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IChef } from 'src/app/assets/models';
import { ChefFormModalComponent } from 'src/app/components/chef-form-modal/chef-form-modal.component';
import { ChefsService } from 'src/app/services/chefs.service';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.scss'],
  providers: []
})
export class ChefsComponent implements OnInit, AfterContentInit {
  chefs: IChef[] = [];

  constructor(private chefsService: ChefsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.setChefs();
  }

  ngAfterContentInit() {
    this.setChefs();
  }

  setChefs() {
    this.chefs = this.chefsService.chefs;
  }

  openModal(chefIndex?: number) {
    const activeModalRef = this.modalService.open(ChefFormModalComponent);
    const chefActiveModal = activeModalRef.componentInstance as ChefFormModalComponent;

    if (chefIndex !== undefined)
      chefActiveModal.editChef = this.chefs[chefIndex];

    const subscription = chefActiveModal.onSubmitEvent.subscribe(chef => {
      console.log("chef after submitted", chef);
      this.chefSubmittedHandler(chef);
      subscription.unsubscribe();
    });

    const deleteSubscription = chefActiveModal.onDeleteEvent.subscribe(chef => {
      console.log("chef to delete ", chef);
      this.chefDeleteHandler(chef);
      deleteSubscription.unsubscribe();
    });
  }

  chefSubmittedHandler(chef: IChef) {
    if (chef._id)
      this.chefsService.updateChef(chef);
    else
      this.chefsService.postChef(chef);
  }

  chefDeleteHandler(chef:IChef){
    this.chefsService.deleteChef(chef._id);
  }



}
