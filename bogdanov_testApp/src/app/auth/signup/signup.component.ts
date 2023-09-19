import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  signupForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.minLength(3)]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) { }

  onSubmit() {
    this.authService.signUp(this.signupForm.value.username!, this.signupForm.value.password!);
  }
}
