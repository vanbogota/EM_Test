import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/post';
import { AppService } from 'src/app/services/app.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent {
  dataSource: MatTableDataSource<Post> = new MatTableDataSource();
  displayedColumns = ['userId', 'title', 'body'];
  post: Post | undefined;

  constructor(
    private router: ActivatedRoute,
    private service: AppService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getPost();
  }

  getPost(): void {
    const id = parseInt(this.router.snapshot.paramMap.get('id')!, 10);
    this.service.getPostById(id)
      .subscribe(data => {
        this.post = data;
        const dataArr = [data];
        this.dataSource.data = dataArr;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
