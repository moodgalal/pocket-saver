import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';


@IonicPage({
  name : "bank-atms"
})
@Component({
  selector: 'page-bank-atm-list',
  templateUrl: 'bank-atm-list.html',
})
export class BankAtmListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams , private alertCtrl : AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankAtmListPage');
  }
}
