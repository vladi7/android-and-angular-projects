import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: any;
  displayedColumns = ['isbn', 'title', 'author', 'publisher', 'published_year', 'updated_date'];
  dataSource = new BookDataSource(this.api);

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.api.getBooks()
      .subscribe(res => {
        this.books = res;
      }, err => {
      });
  }
  deleteBook(id) {
    this.api.deleteBook(id)
      .subscribe(res => {
        this.router.navigate(['/books']);
      });
  }
}

export class BookDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super();
  }

  connect() {
    return this.api.getBooks();
  }

  disconnect() {

  }
}
