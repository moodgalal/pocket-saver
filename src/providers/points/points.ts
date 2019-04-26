import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { PointModel } from './point-model';
import {GlobalFawateriProvider} from '../global-fawateri/global-fawateri'
import {Observable} from "rxjs";

@Injectable()
export class PointsProvider {

  constructor(public http: Http , private global : GlobalFawateriProvider) {
    console.log('Hello PointsProvider Provider');
  }
  getPoints(): Observable<PointModel[]>
  {
    return this.http.get(this.global.apiURL+'/api/allLoyaltyPoint')
               .map(response => response.json() as PointModel[])
  }

}
