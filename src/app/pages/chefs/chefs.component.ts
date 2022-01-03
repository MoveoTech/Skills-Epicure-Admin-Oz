import { Component, OnInit } from '@angular/core';
import { IChef } from 'src/app/assets/models';
import { ChefsService } from 'src/app/services/chefs.service';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.scss'],
  providers: []
})
export class ChefsComponent implements OnInit {
  chefs: IChef[] = [];

  constructor(private chefsService: ChefsService) {

  }

  ngOnInit(): void {
    this.chefsService.chefsUpdateEvent.subscribe(chefs => { this.chefs = chefs })
    // this.chefsService.getChefs()
  }


}
