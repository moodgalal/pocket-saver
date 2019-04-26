import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: 'market-details'
})
@Component({
  selector: 'page-market-details',
  templateUrl: 'market-details.html',
})
export class MarketDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage : Storage ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarketDetailsPage');
  }

  viewAllLoyaltyPoints() {
    this.storage.keys().then(data => {
      if (data.length  == 0) {
        this.navCtrl.setRoot("login");
      } else {
        console.log('you are logged in ');
      }
    });
  }

}
