import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  name : "bank-statements"
})
@Component({
  selector: 'page-bank-statements',
  templateUrl: 'bank-statements.html',
})
export class BankStatementsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankStatementsPage');
  }

}
