import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  logoSrc = 'assets/images/logo@2x.png';
  constructor() { }

  ngOnInit(): void {
  }

}
