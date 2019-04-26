import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
})
export class EntryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryPage');
  }

  goLogin()
  {
    this.navCtrl.push("login");
  }

  goRegister()
  {
    this.navCtrl.push("signup");
  }
  goCategories()
  {
    this.navCtrl.push("our-category");
  }
  goLoyaltyPoints()
  {
    this.navCtrl.push("loyaltyPoints");
  }


}
