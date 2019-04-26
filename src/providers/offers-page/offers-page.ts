import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalFawateriProvider} from "../global-fawateri/global-fawateri";


@Injectable()
export class OffersPageProvider {

  constructor(public http: Http , private global : GlobalFawateriProvider) {
    console.log('Hello OffersPageProvider Provider');
  }

  getCats()
  {
    return this.http.get(this.global.apiURL+`/api/offers/OffersCategories`)
        .map(response => response.json())
  }

  getAllStores()
  {
    return this.http.get(this.global.apiURL+`/api/offers/Allstores`)
        .map(response => response.json())
  }

  getStoresByCat(catId)
  {
    return this.http.get(this.global.apiURL+`/api/offers/StoresInCategory?categoryID=${catId}`)
        .map(response => response.json())
  }
  
  getAllOffers(pageSize , pageNum)  //state 0
  {
    return this.http.get(this.global.apiURL+`/api/offersSale?PageSize=${pageSize}&PageNumber=${pageNum}`)
        .map(response => response.json())
  }

  getOffersByCat(catId , pageNum , pageSize)  //state 1
  {
    return this.http.get(this.global.apiURL+`/api/offers/OffersinCategory?CategoryID=${catId}&pageNumber=${pageNum}&pageSize=${pageSize}`)
        .map(response => response.json())
  }

  getOffersByStore(storeId , pageNum , pageSize)  //state 2
  {
    return this.http.get(this.global.apiURL+`/api/offers/OffersOfStore?StoreID=${storeId}&PageNumber=${pageNum}&pageSize=${pageSize}`)
        .map(response => response.json())
  }

  getOffersByCatStore(catId , storeId , pageNum , pageSize)  //state 3
  {
    return this.http.get(this.global.apiURL+`/api/offers/OffersInStoreCategory?StoreID=${storeId}&CategoryID=${catId}&pageNumber=${pageNum}&pageSize=${pageSize}`)
        .map(response => response.json())
  }

  getFavorites(client , pageNum , pageSize)   //state 4
  {
    return this.http.get(this.global.apiURL+`/api/offers/myFavorits?loginName=${client}&pageNumber=${pageNum}&PageSize=${pageSize}`)
        .map(response => response.json())
  }
  addToFavorites(obj)
  {
    let header = new Headers({"Content-type" : "application/json"});
    
    return this.http.post(this.global.apiURL+`/api/offers/AddToFavorit` , JSON.stringify(obj) , { headers : header} )
        .map(response => response.json());
  }

  deleteFavorites(obj , loginName)
  {
    let header = new Headers({"Content-type" : "application/json"});

    return this.http.post(this.global.apiURL+`/api/offers/removeFromMyFavorits?UserFavoritofferID=${obj.userFavoritofferID}&offerID=${obj.offerID}&LoginName=${loginName}`, {} , { headers : header} )
        .map(response => response.json());
  }
}
