import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';
import { User } from '../user';
/**
 *Class that provides Signup, Login and Logout methods. 
 *
 * @export
 * @class AuthService
 */
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;

  newUser: User = {
    username: '',
    password: ''
  };

  currentUser: User | null = null;

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  /**
   * Method for signup new users, data is saving in Local Storage
   * @param username 
   * @param password 
   * @returns Observable<boolean>: true if signup success, otherwise false
   */
  signUp(username: string, password: string): Observable<boolean> {
    this.newUser.username = username;
    this.newUser.password = password;

    return of(false).pipe(
      tap(() => {
        const userExist = localStorage.getItem(username);
        if (!userExist) {
          localStorage.setItem(username, JSON.stringify(this.newUser));
          this.isLoggedIn = true;
        }
      })
    )
  }

  /**
   * Method for login users
   * @param username 
   * @param password 
   * @returns Observable<boolean>: true if login success, otherwise false
   */
  login(username: string, password: string): Observable<boolean> {
    return of(true).pipe(
      tap(() => {
        this.currentUser = JSON.parse(localStorage.getItem(username)!);
        if (username === this.currentUser?.username
          && password === this.currentUser?.password) {
          this.isLoggedIn = true
        }
      })
    )
  };

  /**
   * Retuns to Login Page.
   */
  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
    this.log('User logged out');
  }

  private log(message: string) {
    this.messageService.add(`AuthService: ${message}`);
  }
}
