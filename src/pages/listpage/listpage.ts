import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  name :  "list-page"
})
@Component({
  selector: 'page-listpage',
  templateUrl: 'listpage.html',
})
export class ListpagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListpagePage');
  }

}
