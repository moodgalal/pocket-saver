import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalFawateriProvider} from "../global-fawateri/global-fawateri";

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  constructor(public http: Http , private global : GlobalFawateriProvider) {
    console.log('Hello ProfileProvider Provider');
  }

  getProfileInfo(user)
  {

        let URL = this.global.apiURL+`/api/KaizenUser/GetProfile?loginName=${user}`;

    return this.http.get(URL)
        .map(res => res.json());
  }

  changePassword(model)
  {
    let URL = this.global.apiURL+`/api/user/ChangePassword`;

    let header = new Headers({"Content-type" : "application/json"});

    return this.http.post(URL , JSON.stringify(model) , {headers : header})
        .map(res => res.json());
  }
}
