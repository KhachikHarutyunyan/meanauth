import { FlashMessagesService } from 'angular2-flash-messages/module';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.formBuild.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const user = {
      username: this.form.controls.username.value,
      password: this.form.controls.password.value,
    };
    this.auth.login(user).subscribe(data => {
      if (data['success']) {
        this.auth.storeUserData(data['token'], data['user']);
        this.flashMessages.show('Now you logged in', { cssClass: 'alert-success', timeout: 3500 });
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessages.show(data['msg'], { cssClass: 'alert-danger', timeout: 3500 });
        this.router.navigate(['/login']);
      }
    });
  }

}
