import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';


@IonicPage({
  name : "branches-modal"
})
@Component({
  selector: 'page-bank-branch-modal',
  templateUrl: 'bank-branch-modal.html',
})
export class BankBranchModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams , private viewCtrl : ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankBranchModalPage');
  }

  closeModal()
  {
    this.viewCtrl.dismiss();
  }
}
