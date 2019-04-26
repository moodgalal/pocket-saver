import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  name : "fawateri-by-cat"
})
@Component({
  selector: 'page-fawateri-by-category',
  templateUrl: 'fawateri-by-category.html',
})
export class FawateriByCategoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FawateriByCategoryPage');
  }

}
