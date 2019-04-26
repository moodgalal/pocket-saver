import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalProvider {
  public apiURL : string = "http://173.212.224.45:2020/api"
}
