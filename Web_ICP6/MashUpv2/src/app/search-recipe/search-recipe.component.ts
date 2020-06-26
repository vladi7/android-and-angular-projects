import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { GetService } from '../get.service';
@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  // view child element reverences
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('minCal') minCal: ElementRef;
  @ViewChild('maxCal') maxCal: ElementRef;
  @ViewChild('max') maxNumber: ElementRef;
  // members of search-recipe component
  recipeValue: any;
  recipeList = [];
  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  minCalories;
  maxCalories;
  max;
  errors;
  constructor(private getService: GetService) {
  }

  ngOnInit() {

  }
  // getting the recipies with injectable service
  getRecipies() {
    this.errors = null;
    this.recipeValue = this.recipes.nativeElement.value;
    this.maxCalories = this.maxCal.nativeElement.value;
    this.minCalories = this.minCal.nativeElement.value;
    this.max = this.maxNumber.nativeElement.value;

    if (this.recipeValue != null && this.recipeValue !== '') {
      /**
       * Write code to get recipe
       */
      if(this.maxCalories !== '' && this.maxCalories != null && this.max !== '' && this.max != null && this.minCalories !== '' && this.minCalories != null)
        this.getService. getRecipies(this.recipeValue, this.maxCalories, this.minCalories, this.max).subscribe((result: any) => {
            this.recipeList = Object.keys(result.hits).map(keyForHits => {
              const recipe = result.hits[keyForHits].recipe;
              return {
                name: recipe.label, icon: recipe.image, url: recipe.url
              };
            });
          }, error => {
            this.errors = 'Error when submitting request. Check your input. Also, you might need to wait since the api calls are limited.';
          }
        );

      else if (this.maxCalories !== '' && this.maxCalories != null && this.max !== '' && this.max != null)
        this.getService. getRecipiesNoMin(this.recipeValue, this.maxCalories, this.max).subscribe((result: any) => {
            this.recipeList = Object.keys(result.hits).map(keyForHits => {
              const recipe = result.hits[keyForHits].recipe;
              return {
                name: recipe.label, icon: recipe.image, url: recipe.url
              };
            });
          }, error => {
          this.errors = 'Error when submitting request. Check your input. Also, you might need to wait since the api calls are limited.';
          }
        );
      else if(this.maxCalories !== '' && this.maxCalories != null && this.minCalories !== '' && this.minCalories != null)
        this.getService.getRecipiesNoMax(this.recipeValue, this.maxCalories, this.minCalories).subscribe((result: any) => {
          this.recipeList = Object.keys(result.hits).map(keyForHits => {
            const recipe = result.hits[keyForHits].recipe;
            return {
              name: recipe.label, icon: recipe.image, url: recipe.url
            };
          });
        }, error => {
        this.errors = 'Error when submitting request. Check your input. Also, you might need to wait since the api calls are limited.';
        }
      );
      else if(this.maxCalories !== '' && this.maxCalories != null)
        this.getService.getRecipiesOnlyMaxCal(this.recipeValue, this.maxCalories).subscribe((result: any) => {
            this.recipeList = Object.keys(result.hits).map(keyForHits => {
              const recipe = result.hits[keyForHits].recipe;
              return {
                name: recipe.label, icon: recipe.image, url: recipe.url
              };
            });
          }, error => {
          this.errors = 'Error when submitting request. Check your input. Also, you might need to wait since the api calls are limited.';
          }
        );
      else if (this.max !== '' && this.max != null){
        this.getService.getRecipiesOnlyMax(this.recipeValue, this.max).subscribe((result: any) => {
              this.recipeList = Object.keys(result.hits).map(keyForHits => {
                const recipe = result.hits[keyForHits].recipe;
                console.log(result);
                return {
                  name: recipe.label, icon: recipe.image, url: recipe.url
                };
              });
            }, error => {
            this.errors = 'Error when submitting request. Check your input. Also, you might need to wait since the api calls are limited.';
            }
          );
      }
      else{
        this.getService.getRecipiesOnlyRecipe(this.recipeValue).subscribe((result: any) => {
            this.recipeList = Object.keys(result.hits).map(keyForHits => {
              const recipe = result.hits[keyForHits].recipe;
              return {
                name: recipe.label, icon: recipe.image, url: recipe.url
              };
            });
          }, error => {
          this.errors = 'Error when submitting request. Check your input. Also, you might need to wait since the api calls are limited.';
          }
        );
      }

    }
    else{
      this.errors = 'Recipe Name Is Required!';
    }
  }
}
