import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  name : "bank-phones"
})
@Component({
  selector: 'page-bank-phones-list',
  templateUrl: 'bank-phones-list.html',
})
export class BankPhonesListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankPhonesListPage');
  }

}
