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
  book = {};
  id;
  bookForm: FormGroup;

  constructor( private currentRoute: ActivatedRoute,
              private api: ApiService, private routerInject: Router,
              private formBuilder: FormBuilder) {
    // getting the current id
    this.id = this.currentRoute.snapshot.params['id'];
    //getting the book details
    this.getBookDetails(this.id);
    //getting the book for empty before it will be populated with ngmodel
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

  //method to get the book details
  getBookDetails(id) {
    this.api.getBook(id)
      .subscribe(data => {
        this.book = data;
      });
  }
        //method to submit the form
        onFormSubmit(form: NgForm) {
          this.api.updateBook(this.id, form)
            .subscribe(res => {
              const id = res['_id'];
              this.routerInject.navigate(['/book-details', id]);
            });
        }
}



