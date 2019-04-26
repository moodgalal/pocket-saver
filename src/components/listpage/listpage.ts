import { Component } from '@angular/core';

/**
 * Generated class for the ListpageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'listpage',
  templateUrl: 'listpage.html'
})
export class ListpageComponent {

  text: string;

  constructor() {
    console.log('Hello ListpageComponent Component');
    this.text = 'Hello World';
  }

}
