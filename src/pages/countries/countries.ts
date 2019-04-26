import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SignupProvider} from "../../providers/signup/go-green-server";

@IonicPage({
  name : "countries"
})
@Component({
  selector: 'page-countries',
  templateUrl: 'countries.html',
})
export class CountriesPage {

  countries : Array<any>;
  MobileModel : any = null;
  selected : number = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private server : SignupProvider
  ) {

  }

  ionViewDidEnter() {
    this.MobileModel = this.navParams.get("model");

    if(this.MobileModel != null)
        this.selected = this.MobileModel.CountryCode;

    this.getCountries()
  }

  getCountries()
  {
     this.server.getCountries().subscribe((res)=>{
       console.log("countries");
       console.log(res);
       this.countries = res;
     })
  }

  select(countryCode)
  {
    this.MobileModel.CountryCode = countryCode;
    this.navCtrl.push("cities" , {model : this.MobileModel})
  }
}
