import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IChef, IServerResponse } from 'src/app/assets/models';
import { ChefFormModalComponent } from 'src/app/components/chef-form-modal/chef-form-modal.component';
import { AuthService,ChefsService } from 'src/app/services';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.scss'],
  providers: []
})
export class ChefsComponent implements OnInit {
  chefs: IChef[] = [];
  chefFormModal: {
    submitSubscription: Subscription,
    deleteSubscription: Subscription,
  } = {
    submitSubscription: undefined,
      deleteSubscription: undefined,
    };

  constructor(private chefsService: ChefsService, private modalService: NgbModal, private authService:AuthService) {
    
    this.chefsService.chefsUpdateEvent.subscribe(chefs => this.setChefs(chefs))
    this.chefsService.serverResponseEvent.subscribe(response => this.serverResponseHandler(response))

  }


  ngOnInit(): void {
    this.chefs.length == 0 && this.setChefs();
  }

  setChefs(chefs?: IChef[]) {
    if (chefs)
      this.chefs = chefs;
    else
      this.chefs = this.chefsService.chefs;
  }

  openModal(chefIndex?: number) {
    console.log("openModal this.chefFormModal", this.chefFormModal)
    const modalRef = this.modalService.open(ChefFormModalComponent);
    const activeModal = modalRef.componentInstance as ChefFormModalComponent;

    activeModal.serverSubmitResponseEvent = this.chefsService.serverResponseEvent;

    if (chefIndex !== undefined)
      activeModal.editChef = this.chefs[chefIndex];

    this.chefFormModal.submitSubscription = activeModal.onSubmitEvent.subscribe(chef => {
      console.log("chef after submitted", chef);
      this.chefSubmitHandler(chef);
    });
    ;

    this.chefFormModal.deleteSubscription = activeModal.onDeleteEvent.subscribe(chef => {
      console.log("chef to delete ", chef);
      this.chefDeleteHandler(chef);
    });
  }

  chefSubmitHandler(chef: IChef) {
    console.log("chefSubmitHandler");
    if (chef._id)
      this.chefsService.updateChef(chef);
    else
      this.chefsService.postChef(chef);
  }

  chefDeleteHandler(chef: IChef) {
    this.chefsService.deleteChef(chef);
  }

  serverResponseHandler(response: IServerResponse): void {
    if (response.valid) {
      this.chefFormModal.submitSubscription.unsubscribe();
      this.chefFormModal.deleteSubscription.unsubscribe();
    }
  }

  logout(){
    this.authService.logout();
  }

}
