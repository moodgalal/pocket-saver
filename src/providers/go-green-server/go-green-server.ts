import { Injectable } from '@angular/core';
import { Http , Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalFawateriProvider} from "../global-fawateri/global-fawateri";


@Injectable()
export class GoGreenServerProvider {

  constructor(public http: Http , private global : GlobalFawateriProvider) {
  }

  getCurrencies()
  {
    let URL = this.global.apiURL+"/api/KaizenUser/GetALLCurrencies";

    return this.http.get(URL)
        .map(res => res.json());
  }
  getGender()
  {
    let URL = this.global.apiURL+"/api/KaizenUser/Gender";

    return this.http.get(URL)
        .map(res => res.json());
  }
  getCountries()
  {
    let URL = this.global.apiURL+"/api/countries";

    return this.http.get(URL)
        .map(res => res.json());
  }
  getCities(countryCode)
  {
    let URL = this.global.apiURL+"/api/cities?CountryCode="+countryCode;

    return this.http.get(URL)
        .map(res => res.json());
  }
  getBlocks(cityCode)
  {
    let URL = this.global.apiURL+"/api/Blocks?CityCode="+cityCode;

    return this.http.get(URL)
        .map(res => res.json());
  }

  signUp(MobileModel)
  {
    console.log(MobileModel);
    let URL = this.global.apiURL+"/api/KaizenUser/Register";

      let header = new Headers({"Content-type" : "application/json"});

    return this.http.post(URL , JSON.stringify(MobileModel) , {headers: header})
        .map(res => res.json());
  }
}
