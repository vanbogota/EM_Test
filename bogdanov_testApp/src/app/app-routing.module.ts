import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';

import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { SignupComponent } from './auth/signup/signup.component';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    title: 'Authorization',
    component: LoginComponent
  },
  {
    path: 'signup',
    title: 'Sign Up',
    component: SignupComponent
  },
  {
    path: 'posts',
    title: 'Posts',
    component: PostsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'posts/:id',
    title: 'Post',
    component: PostComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withComponentInputBinding())
  ]
})
export class AppRoutingModule { }
