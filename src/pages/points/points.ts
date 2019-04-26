import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover'

import { PointModel } from '../../providers/points/point-model';
import { PointsProvider } from '../../providers/points/points'

@IonicPage({
  name:"points"
})
@Component({
  selector: 'page-points',
  templateUrl: 'points.html',
})
export class PointsPage {

  points : Array<PointModel>;
  loading: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              public loadingCtrl: LoadingController,
              public provider:PointsProvider) {
    this.loading = this.loadingCtrl.create();
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
  }

  ionViewDidLoad() {
    // this.loading.present();
    // this.provider.getPoints()
    //       .subscribe(points => {
    //         this.points = points;
    //         this.loading.dismiss();
    //       });
  }
  openBarcodePage(){
    this.navCtrl.push("barcode");
  }

}
