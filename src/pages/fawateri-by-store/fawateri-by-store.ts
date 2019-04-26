import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  name : "fawateri-by-store"
})

@Component({
  selector: 'page-fawateri-by-store',
  templateUrl: 'fawateri-by-store.html',
})
export class FawateriByStorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FawateriByStorePage');
  }

}
