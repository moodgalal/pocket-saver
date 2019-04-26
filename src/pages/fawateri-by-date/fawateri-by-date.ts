import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  name : "fawateri-by-date"
})

@Component({
  selector: 'page-fawateri-by-date',
  templateUrl: 'fawateri-by-date.html',
})
export class FawateriByDatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FawateriByDatePage');
  }

}
