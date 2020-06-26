import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetService} from '../get.service';


@Component({
  selector: 'app-search-places',
  templateUrl: './search-places.component.html',
  styleUrls: ['./search-places.component.css']
})
export class SearchPlacesComponent implements OnInit {
  // view child references
  @ViewChild('place') places: ElementRef;
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('max') maxNumber: ElementRef;
  // members of search places component
  max;
  errors;
  placeValue: any;
  recipeValue: any;
  venueList = [];
  currentLat: any;
  currentLong: any;
  geolocationPosition: any;
  constructor(private getService: GetService) {
  }
  // gets the current location of the user after requesting the permission
  ngOnInit() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }
  // gets the places using the service injectable. It has a banch of scenarious but one field with recipe is required.
  getVenues() {
    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;
    this.max = this.maxNumber.nativeElement.value;
    this.errors = null;

    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null && this.recipeValue !== '' && this.max !== '' && this.max != null) {
      this.getService.getPlaces(this.recipeValue, this.placeValue, this.max).
      subscribe(respPlaces => {
        const resp = 'response';
        const venues = 'venues';
        this.venueList = respPlaces[resp][venues];
      }, error => {
        this.errors = 'Error when submitting request. Check your input. Also, you might need to wait since the api calls are limited.';
      });
    }
    else if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null && this.recipeValue !== '') {
      this.getService.getPlacesPlaceAndRecipe(this.recipeValue, this.placeValue).subscribe(respPlaces => {
        const resp = 'response';
        const venues = 'venues';
        this.venueList = respPlaces[resp][venues];
      }, error => {
        this.errors = 'Error when submitting request. Check your input. Also, you might need to wait since the api calls are limited.';
      });
    }
    else if(this.recipeValue != null && this.recipeValue !== '' && this.max !== '' && this.max != null){
      this.getService.getPlacesCurrentPosition(this.recipeValue, this.max, this.currentLat, this.currentLong).
      subscribe(respPlaces => {
        const resp = 'response';
        const venues = 'venues';
        this.venueList = respPlaces[resp][venues];
      }, error => {
        this.errors = 'Error when submitting request. Check your input. Also, you might need to wait since the api calls are limited.';
      });
    }
    else if(this.recipeValue != null && this.recipeValue !== ''){
      this.getService.getPlacesCurrentPositionNoMax(this.recipeValue, this.currentLat, this.currentLong).subscribe(respPlaces => {
        const resp = 'response';
        const venues = 'venues';
        this.venueList = respPlaces[resp][venues];
      }, error => {
        this.errors = 'Error when submitting request. Check your input. Also, you might need to wait since the api calls are limited.';
      });
    }

    else{
      this.errors = 'Recipe Name Is Required!';
    }

  }
  // gets the image from the api after getting the info from category.icon
  get_image_url(val) {
    return val.prefix + 88 + val.suffix;
  }
  // to log the variable directly from html
  log(val){
    console.log(val);
  }
}
