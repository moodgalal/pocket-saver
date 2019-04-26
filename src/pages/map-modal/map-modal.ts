import { Component  , ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

declare let google;

@IonicPage({
  name:"map"
})
@Component({
  selector: 'page-map-modal',
  templateUrl: 'map-modal.html',
})
export class MapModalPage {
  @ViewChild('map') mapElement;

    lat : number;
    lng : number;

  constructor(public navCtrl: NavController, public navParams: NavParams , private viewCtrl : ViewController) {
  }

  ionViewDidLoad()
  {
      this.lat = this.navParams.get("lat");
      this.lng = this.navParams.get("lng");
    this.initMap(this.lat , this.lng);
  }

  initMap(lat , lng)
  {
     if(lat !== null && lng !== null)
     {
         let latAndLng = new google.maps.LatLng( lat , lng) ;

         let map = new google.maps.Map(this.mapElement.nativeElement, {
             zoom: 15,
             center: latAndLng,
             mapTypeId : google.maps.MapTypeId.ROADMAP
         });
         let marker = new google.maps.Marker({
             position: latAndLng,
             animation: google.maps.Animation.DROP,
             map: map
         });
     }
  }
  dismiss()
  {
    this.viewCtrl.dismiss();
  }
}
