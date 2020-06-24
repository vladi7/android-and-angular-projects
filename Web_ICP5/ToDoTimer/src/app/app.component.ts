import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from './data.service';
import {Item} from './item';
import {formatDate } from '@angular/common';
import { Observable } from 'rxjs';
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

  private eventDate: Date = new Date(2021, 9, 22);
  dateTo;
  private diff: number;

  private countDownResult: number;
  public days;
  public hours;
  public minutes;
  public seconds;

  constructor(private thisDataService: DataService) {
    this.DataService = thisDataService;
    this.dateTo = new Date();
    this.a2eOptions = { minDate: new Date() };
  }
  // how to get a time: https://stackoverflow.com/questions/54289078/display-time-clock-in-angular
  ngOnInit() {
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
  ngOnDestroy(){
    clearInterval(this.timer);
  }
  addItems() {
    this.DataService.addItem(this.newItem);
    this.newItem = new Item();
  }

  checkItemDone(todo) {
    this.DataService.completeItem(todo);
  }

  removeItem(todo) {
    this.DataService.deleteItem(todo.id);
  }

  get items() {
    return this.DataService.getAllItems();
  }
  getDays(t){
    return Math.floor(t / 86400);
  }

  getHours(t){
    const days = Math.floor(t / 86400);
    t -= days * 86400;
    const hours = Math.floor(t / 3600) % 24;
    return hours;
  }

  getMinutes(t){
    const days = Math.floor(t / 86400);
    t -= days * 86400;
    const hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    const minutes = Math.floor(t / 60) % 60;
    return minutes;
  }

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
