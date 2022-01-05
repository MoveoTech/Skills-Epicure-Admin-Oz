import { Component } from '@angular/core';
import { ChefsService } from './services/chefs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Epicure-Admin';

  //chefsService declaration to fetch data when web start
  constructor( private chefsService: ChefsService){}
}
