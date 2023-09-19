import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string;

  authForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.minLength(3)]
  });

  constructor(
    public authService: AuthService,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.message = 'Для входа введите данные:';
  }

  onLoginButtonClick() {
    this.login();
  }

  onRegisterButtonClick() {
    this.signUp();
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService
      .login(this.authForm.value.username!, this.authForm.value.password!)
      .subscribe(() => {
        if (this.authService.isLoggedIn) {
          this.router.navigate(['/posts']);
        }
        this.message = 'Неверный логин или пароль'
      });
  }

  signUp() {
    this.authService
      .signUp(this.authForm.value.username!, this.authForm.value.password!)
      .subscribe(() => {
        if (this.authService.isLoggedIn) {
          this.router.navigate(['/posts']);
        }
        this.message = 'Такой пользователь уже существует'
      });
  }
}
