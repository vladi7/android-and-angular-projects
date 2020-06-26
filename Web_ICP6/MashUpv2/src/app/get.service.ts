import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

// injectable service that provides the wrapper for the HttpClient injectable to use cleaner in the code.
// Has all the get request that were needed for the app.
@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private httpClient: HttpClient) { }

  // all values present
  getRecipies(recipeValue, maxCalories, minCalories, max) {
    return this.httpClient.get('https://api.edamam.com/search?q=' + recipeValue +
      '&app_id=c8fcd435&app_key=0d914c61a22a113cab9faf1fb8a029a2&from=0&to=' + max + '&calories=' + minCalories + '-' + maxCalories);
  }

  getRecipiesNoMin(recipeValue, maxCalories, max) {
    return this.httpClient.get('https://api.edamam.com/search?q=' + recipeValue +
      '&app_id=c8fcd435&app_key=0d914c61a22a113cab9faf1fb8a029a2&from=0&to=' + max + '&calories=' + 0 + '-' + maxCalories);
  }

  getRecipiesNoMax(recipeValue, maxCalories, minCalories) {
    return this.httpClient.get('https://api.edamam.com/search?q=' + recipeValue +
      '&app_id=c8fcd435&app_key=0d914c61a22a113cab9faf1fb8a029a2&from=0&to=' + 8 + '&calories=' + minCalories + '-' + maxCalories);
  }
  getRecipiesOnlyMaxCal(recipeValue, maxCalories) {
    return this.httpClient.get('https://api.edamam.com/search?q=' + recipeValue +
      '&app_id=c8fcd435&app_key=0d914c61a22a113cab9faf1fb8a029a2&from=0&to=' + 8 + '&calories=' + 0 + '-' + maxCalories);
  }
  getRecipiesOnlyMax(recipeValue, max) {
    return this.httpClient.get('https://api.edamam.com/search?q=' + recipeValue +
      '&app_id=c8fcd435&app_key=0d914c61a22a113cab9faf1fb8a029a2&from=0&to=' + max);
  }
  getRecipiesOnlyRecipe(recipeValue) {
    return this.httpClient.get('https://api.edamam.com/search?q=' + recipeValue +
      '&app_id=c8fcd435&app_key=0d914c61a22a113cab9faf1fb8a029a2&from=0&to=' + 8);
  }
  getPlaces(recipeValue, placeValue, max) {
    return this.httpClient.get('https://api.foursquare.com/v2/venues/search?client_id=BCBVR0D4OB1MOFQMYGURJGB2PTNZW1KWCSBMIFA4UNOUODIH&client_secret=MYYNM2BN3FBIZESAAI0RLTSUKD2FYTFS5CT3LGHKU1ZGCTGG&v=20200110&limit=' + max + '&near=' + placeValue + '&query=' + recipeValue);
  }
  getPlacesCurrentPosition(recipeValue, max, currentLat, currentLong){
    return this.httpClient.get('https://api.foursquare.com/v2/venues/search?client_id=BCBVR0D4OB1MOFQMYGURJGB2PTNZW1KWCSBMIFA4UNOUODIH&client_secret=MYYNM2BN3FBIZESAAI0RLTSUKD2FYTFS5CT3LGHKU1ZGCTGG&v=20200110&limit=' + max + '&ll=' + currentLat + ',' + currentLong + '&query=' + recipeValue);
  }
  getPlacesCurrentPositionNoMax(recipeValue, currentLat, currentLong) {
    return this.httpClient.get('https://api.foursquare.com/v2/venues/search?client_id=BCBVR0D4OB1MOFQMYGURJGB2PTNZW1KWCSBMIFA4UNOUODIH&client_secret=MYYNM2BN3FBIZESAAI0RLTSUKD2FYTFS5CT3LGHKU1ZGCTGG&v=20200110&limit=8&ll=' + currentLat + ',' + currentLong + '&query=' + recipeValue);
  }
  getPlacesPlaceAndRecipe(recipeValue, placeValue){
    return this.httpClient.get('https://api.foursquare.com/v2/venues/search?client_id=BCBVR0D4OB1MOFQMYGURJGB2PTNZW1KWCSBMIFA4UNOUODIH&client_secret=MYYNM2BN3FBIZESAAI0RLTSUKD2FYTFS5CT3LGHKU1ZGCTGG&v=20200110&limit=8&near=' + placeValue + '&query=' + recipeValue);

  }
  }

