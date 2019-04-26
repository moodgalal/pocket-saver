import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { GlobalFawateriProvider } from '../global-fawateri/global-fawateri'

@Injectable()
export class BillsProvider {

  constructor(public http: Http , private global : GlobalFawateriProvider) {
  }

  getBills(user)
  {
    return this.http.get(this.global.apiURL+`/api/MyFawateeri?loginName=${user}`)
               .map(response => response.json())
  }

  getBillsByDate(user , from , to)
  {
      return this.http.get(this.global.apiURL+`/api/fawateer/ByDate?LoginName=${user}&from=${from}&to=${to}`)
          .map(response => response.json())
  }


  deleteBill(id)
  {
      console.log("inside the delete service");

      return this.http.get(this.global.apiURL+`/api/Fawateer/Delete?trxid=${id}`)
  }
}
