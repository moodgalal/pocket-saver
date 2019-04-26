import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage({
  name:"bank-profile"
})
@Component({
  selector: 'page-bank-profile',
  templateUrl: 'bank-profile.html',
})
export class BankProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage : Storage ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankProfilePage');
  }

  desc()
  {
    this.navCtrl.push("bank-desc")
  }

  phones()
  {
    this.navCtrl.push("bank-phones")
  }

  atms()
  {
    this.navCtrl.push("bank-atms")
  }

  branches()
  {
    this.navCtrl.push("bank-branches-list")
  }

  bankStatements()
  {
    this.navCtrl.push("bank-statements")
  }

  bankReceipts(){
    this.storage.keys().then(data => {
      if (data.length  == 0) {
        this.navCtrl.setRoot("login");
      } else {
        this.navCtrl.push("bank-receipts")
      }
    });
  }

  otherReceipts() {
    this.storage.keys().then(data => {
      if (data.length  == 0) {
        this.navCtrl.setRoot("login");
      } else {
        this.navCtrl.push("other-receipts")
      }
    });
  }
}
