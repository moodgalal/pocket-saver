import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SignupProvider} from "../../providers/signup/go-green-server";

@IonicPage({
  name:"cities"
})
@Component({
  selector: 'page-cities',
  templateUrl: 'cities.html',
})
export class CitiesPage {

  cities : Array<any>;
  MobileModel : any = null;
  selected : number = null;
  countryCode : number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private server : SignupProvider
  ) {

  }

  ionViewDidEnter() {
    this.MobileModel = this.navParams.get("model");
        if(this.MobileModel != null)
        {
          this.selected = this.MobileModel.CityCode;
          this.countryCode = this.MobileModel.CountryCode;
          this.getCities(this.countryCode)
        }

  }

  getCities(country)
  {
    this.server.getCities(country).subscribe((res)=>{
      console.log("cities");
      console.log(res);
      this.cities = res;
    })
  }

  select(cityCode)
  {
    this.MobileModel.CityCode = cityCode;
    this.navCtrl.push("blocks" , {model : this.MobileModel})
  }

}
