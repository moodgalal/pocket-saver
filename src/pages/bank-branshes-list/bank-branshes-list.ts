import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';


@IonicPage({
  name : "bank-branches-list"
})
@Component({
  selector: 'page-bank-branshes-list',
  templateUrl: 'bank-branshes-list.html',
})
export class BankBranshesListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams , private modalCtrl : ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankBranshesListPage');
  }

  openModal()
  {
    this.modalCtrl.create("branches-modal").present();
  }
}
