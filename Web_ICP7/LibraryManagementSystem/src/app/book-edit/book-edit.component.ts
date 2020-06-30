import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ApiService} from '../api.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;
  book = {};
  id;
  constructor( private currentRoute: ActivatedRoute,
              private api: ApiService, private routerInject: Router,
              private formBuilder: FormBuilder) {
    this.id = this.currentRoute.snapshot.params['id'];
    this.getBookDetails(this.id);
    this.bookForm = this.formBuilder.group({
      'isbn': [' ', Validators.required],
      'title': [' ', Validators.required],
      'description': [' ', Validators.required],
      'author': [' ', Validators.required],
      'publisher': [' ', Validators.required],
      'published_year': [' ', Validators.required]
    });
  }
  ngOnInit() {

  }
  getBookDetails(id) {
    this.api.getBook(id)
      .subscribe(data => {
        this.book = data;
      });
  }
  onFormSubmit(form: NgForm) {
    this.api.updateBook(this.id, form)
      .subscribe(res => {
        const id = res['_id'];
        this.routerInject.navigate(['/book-details', id]);
      });
  }
}



