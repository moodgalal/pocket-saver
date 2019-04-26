import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalFawateriProvider
{
  public apiURL : string = 'http://80.241.213.162:5050';
}