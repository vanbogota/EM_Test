import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AppService } from 'src/app/services/app.service';
import { Post } from 'src/app/post';
import { User } from 'src/app/user';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['userId', 'id', 'title', 'body'];
  posts: Post[] = [];
  currentIndex = '';

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.appService.getPosts().subscribe(data => {
      this.posts = data;
      this.dataSource.data = this.posts;
    });
  }

  setCurrentId() {

  }
}
