import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  name : "bank-desc"
})
@Component({
  selector: 'page-bank-decription',
  templateUrl: 'bank-decription.html',
})
export class BankDecriptionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankDecriptionPage');
  }

}
