import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalFawateriProvider} from "../global-fawateri/global-fawateri";


@Injectable()
export class StoresProvider {

  constructor(public http: Http , private global :GlobalFawateriProvider) {
    console.log('Hello StoresProvider Provider');
  }

  getCats()
  {
      let Url = this.global.apiURL+`/api/storesType`;

      return this.http.get(Url)
          .map(res => res.json());
  }

   getStoresByCat(catId)
   {
      let Url = this.global.apiURL+`/api/storesByCategory?CategoryID=${catId}`;

      return this.http.get(Url)
          .map(res => res.json());
   }

    getStoresInfo(id)
    {
        let Url = this.global.apiURL+`/api/storeById?storeId=${id}`;

        return this.http.get(Url)
            .map(res => res.json());
    }

    getBillsByStore(loginName , storeId)
    {
        let Url = this.global.apiURL+`/api/fawateer/FromStore?StoreID=${storeId}&LoginName=${loginName}`;

        return this.http.get(Url)
            .map(res => res.json());
    }

    getOffersByStore(storeId , pageNum , pageSize)
    {
        return this.http.get(this.global.apiURL+`/api/offers/OffersOfStore?StoreID=${storeId}&PageNumber=${pageNum}&pageSize=${pageSize}`)
            .map(response => response.json())
    }
}
