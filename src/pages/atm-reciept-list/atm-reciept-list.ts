import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';


@IonicPage({
  name : "bank-receipts"
})
@Component({
  selector: 'page-atm-reciept-list',
  templateUrl: 'atm-reciept-list.html',
})
export class AtmRecieptListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams , private alertCtrl : AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtmRecieptListPage');
  }

  doFilter()
  {
    this.alertCtrl.create({
      title:"Select Parking",
      inputs : [
        {
          type : "radio",
          label: "Daily",
          value: "1"
        },
        {
          type : "radio",
          label: "Weekly",
          value: "2"
        },
        {
          type : "radio",
          label: "Monthly",
          value: "3"
        },
        {
          type : "radio",
          label: "Quarter",
          value: "4"
        },
        {
          type : "radio",
          label: "Yearly",
          value: "5"
        },
      ],
      buttons : [
        {
          text:"Close",
        },
        {
          text: "Filter",
          handler : (value)=>{
            console.log(value)
          }
        }
      ]
    }).present()

  }
}
