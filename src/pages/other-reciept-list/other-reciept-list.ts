import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';


@IonicPage({
  name : "other-receipts"
})
@Component({
  selector: 'page-other-reciept-list',
  templateUrl: 'other-reciept-list.html',
})
export class OtherRecieptListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams , private alertCtrl : AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherRecieptListPage');
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
