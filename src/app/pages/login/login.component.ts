import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    const user = this.form.form.value;

    this.authService.login(user);
  }

}
