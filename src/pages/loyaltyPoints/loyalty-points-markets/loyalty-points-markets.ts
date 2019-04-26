import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoyaltyPointsMarketsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: "loyaltyPoints"
})
@Component({
  selector: 'page-loyalty-points-markets',
  templateUrl: 'loyalty-points-markets.html',
})
export class LoyaltyPointsMarketsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoyaltyPointsMarketsPage');
  }

  goToMarket(pageName: string) {
    this.navCtrl.push(pageName);
  }
  filter(event) {
    console.log(event);
  }

}
