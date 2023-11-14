import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { AppService } from 'src/app/services/app.service';
import { Post } from 'src/app/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  dataSource: MatTableDataSource<Post> = new MatTableDataSource();
  displayedColumns = ['userId', 'id', 'title', 'body'];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.appService.getPosts().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
