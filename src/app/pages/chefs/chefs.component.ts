import { AfterContentInit, Component, OnInit } from '@angular/core';
import { IChef } from 'src/app/assets/models';
import { ChefsService } from 'src/app/services/chefs.service';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.scss'],
  providers: []
})
export class ChefsComponent implements OnInit, AfterContentInit {
  chefs: IChef[] = [];

  constructor(private chefsService: ChefsService) {

  }

  ngOnInit(): void {
    this.chefsService.chefsUpdateEvent.subscribe(chefs => { this.chefs = chefs })
    // this.chefsService.getChefs()
  }

  ngAfterContentInit() {
    this.setChefs();
  }

  setChefs() {
    this.chefs = this.chefsService.chefs;
  }


}
