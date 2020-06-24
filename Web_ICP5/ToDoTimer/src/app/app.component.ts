import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from './data.service';
import {Item} from './item';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements OnInit, OnDestroy{
  time = new Date();
  timer;
  a2eOptions;
  newItem: Item = new Item();
  countDown;
  hideText = false;
  private DataService: DataService;

  dateTo;
  private diff: number;

  private countDownResult: number;
  public days;
  public hours;
  public minutes;
  public seconds;
  // main component, uses injectable as a fake database
  constructor(private thisDataService: DataService) {
    this.DataService = thisDataService;
    this.dateTo = new Date();
    this.a2eOptions = { minDate: new Date() };
  }
  // how to get a time: https://stackoverflow.com/questions/54289078/display-time-clock-in-angular
  // gets time now.
  ngOnInit() {
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
  // clears the interval when destroyed
  ngOnDestroy(){
    clearInterval(this.timer);
  }

  // adds item using a fake api call
  addItems() {
    this.DataService.addItem(this.newItem);
    this.newItem = new Item();
  }

  // marks item done using a fake api call
  checkItemDone(todo) {
    this.DataService.completeItem(todo);
  }
  // removes item using a fake api call
  removeItem(todo) {
    this.DataService.deleteItem(todo.id);
  }
  // gets all items using a fake api call
  get items() {
    return this.DataService.getAllItems();
  }
  // retrieved from stack overflow, can't find where at.
  // converts time to days
  getDays(t){
    return Math.floor(t / 86400);
  }
  // converts time to hours
  getHours(t){
    const days = Math.floor(t / 86400);
    t -= days * 86400;
    const hours = Math.floor(t / 3600) % 24;
    return hours;
  }
  // converts time to minutes
  getMinutes(t){
    const days = Math.floor(t / 86400);
    t -= days * 86400;
    const hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    const minutes = Math.floor(t / 60) % 60;
    return minutes;
  }
  // converts time to seconds
  getSeconds(t){
    const days = Math.floor(t / 86400);
    t -= days * 86400;
    const hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    const minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    const seconds = t % 60;
    return seconds;
  }
  // adds a timer when the calendar is clicked. Starts the timer when a date greater than now is chosen.
  addTimer(){
    this.hideText = true;
    interval(100).pipe(map((x) => {
      this.diff = Math.floor((this.dateTo - new Date().getTime()) / 1000);
    })).subscribe((x) => {
      if (this.getDays(this.diff) < 0){
        this.days = 0 + ' days';
        this.hours = 0 + ' hours';
        this.minutes = 0 + ' minutes';
        this.seconds = 0 + ' seconds';
      }
      else {
        this.days = this.getDays(this.diff) + ' days';
        this.hours = this.getHours(this.diff) + ' hours';
        this.minutes = this.getMinutes(this.diff) + ' minutes';
        this.seconds = this.getSeconds(this.diff) + ' seconds';
      }
    });
  }
}
