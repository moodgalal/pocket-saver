import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalFawateriProvider} from "../global-fawateri/global-fawateri";


@Injectable()
export class EditBillProvider {

  constructor(public http: Http , private global : GlobalFawateriProvider) {
  }

  getCat(user)
  {
    return this.http.get(this.global.apiURL+`/api/category/my?LoginName=${user}`)
                    .map(res => res.json())
  }
  getSubCat(user , cat)
  {
    return this.http.get(this.global.apiURL+`/api/subCatigory/my?LoginName=${user}&CategoryID=${cat}`)
        .map(res => res.json())
  }
  updateBill(obj)
  {
    let header = new Headers({"Content-type" : "application/json"});
     return this.http.post(this.global.apiURL+`/api/Fawateer/UpdateBasics` , JSON.stringify(obj) , { headers : header} );
  }

  addCat(obj , user)
  {
      let header = new Headers({"Content-type" : "application/json"});

    return this.http.post(this.global.apiURL+`/api/catigory/save?LoginName=${user}` , JSON.stringify(obj) , { headers : header} )
        .map(res => res.json());
  }
  addSubCat(obj)
  {
    let header = new Headers({"Content-type" : "application/json"});

    return this.http.post(this.global.apiURL+`/api/subCatigory/save?LoginName=${obj.LoginName}` , JSON.stringify(obj) , { headers : header} )
        .map(res => res.json());
  }
  addBill(obj)
  {
    let header = new Headers({"Content-type" : "application/json"});

    return this.http.post(this.global.apiURL+`/api/Fawateer/Add` , JSON.stringify(obj) , { headers : header} );
  }

  billLocation(barcode)
  {
    let header = new Headers({"Content-type" : "application/json"});
    return this.http.post(this.global.apiURL+`/api/Fawateer/addLocation` , JSON.stringify(barcode) , { headers : header} );
  }

  billBarcode(obj , id)
  {
    let header = new Headers({"Content-type" : "application/json"});
    return this.http.post(this.global.apiURL+`/api/Fawateer/AddBarCode?trxID=${id}&BarCode=${obj}` , {} , { headers : header} );
  }

  billImage(obj , id)
  {
    console.log(obj.Code);
    let header = new Headers({"Content-type" : "application/json"});
    return this.http.post(this.global.apiURL+`/api/Fawateer/saveImage?TrxID=${id}` , JSON.stringify(obj) , { headers : header} );
  }

  addStore(obj)
  {

    let header = new Headers({"Content-type" : "application/json"});

    return this.http.post(this.global.apiURL+`/api/stores/add` , JSON.stringify(obj) , { headers : header} )
        .map(res=>res.json());
  }

  getStoreTypes()
  {
    return this.http.get(this.global.apiURL+`/api/storesType`)
        .map(res => res.json())
  }
  getStoreNames(typeId)
  {
    return this.http.get(this.global.apiURL+`/api/storesByCategory?CategoryID=${typeId}`)
        .map(res => res.json())
  }

  getCurrencies()
  {
    let URL = this.global.apiURL+"/api/KaizenUser/GetALLCurrencies";

    return this.http.get(URL)
        .map(res => res.json());
  }

  editAdvanced(obj)
  {
    let header = new Headers({"Content-type" : "application/json"});
    return this.http.post(this.global.apiURL+`/api/Fawateer/advanced` , JSON.stringify(obj) , { headers : header} );
  }

  getAdvancedInfo(id)
  {
    return this.http.get(this.global.apiURL+`/api/fawateer/one?trxid=${id}`)
        .map(res => res.json());
  }

}
