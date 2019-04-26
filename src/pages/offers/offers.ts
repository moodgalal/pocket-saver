import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover'
import {OffersPageProvider} from "../../providers/offers-page/offers-page";

@IonicPage({
  name : "offers"
})
@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {

    cats : Array<any> = [];
    stores : Array<any> = [];
    offers : Array<any> = [];

    pageCounter : number[] = [2,2,2,2,2];

    offersState : number = null;
   pageSize : number = 3;
    catId : number = null;
     storeId : number = null;
    notFound : boolean = true;
    selectedCat : number = null;
    selectedStore : number = null;

    storeImgUrl : string = 'http://80.241.213.162:5050/Images/Stores/';
    offerImgUrl : string = 'http://80.241.213.162:5050/Images/Offers/';

    loginName : string = "Zozo";

    favoriteIcon : boolean =true;
    noMoreHidden : boolean =true;
    catsFilter:string = "all";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              private offersProvider : OffersPageProvider,
              private alertCtrl : AlertController
  ) {
  }

    ionViewDidLoad()
    {
      this.getAllCats();
      this.getAllStores();
      this.getAllOffers();
    }

    getAllCats()
    {
       this.offersProvider.getCats()
           .subscribe((res)=>
           {
               console.log("all cats");
               console.log(res);

              this.cats = res;
               console.log("cats");
               console.log(res);
           } , ()=>
           {
              this.showServerError();
           })
    }

    getAllStores()
    {
        this.offersProvider.getAllStores()
            .subscribe((res)=>
            {
                if (res.length !== 0)
                {
                    console.log("all stores");
                    console.log(res);

                    this.stores = res;
                }
                else
                {
                    this.stores = null
                }
            } , ()=>
            {
                this.showServerError();
            })
    }

    getByCat(catId)
    {
        this.favoriteIcon = true;
        this.selectedCat = catId;
        this.catId = catId;
        this.selectedStore = null;

        if (catId !== null)
        {
            this.offersProvider.getStoresByCat(this.catId)
                .subscribe((res)=>
                {
                    if (res.length !== 0)
                    {
                        console.log("stores by cat");
                        console.log(res);

                        this.stores = res;
                    }
                    else
                    {
                        this.stores = null
                    }
                } , ()=>
                {
                    this.showServerError();
                });

            this.offersProvider.getOffersByCat(this.catId , 1 , this.pageSize)
                .subscribe((res)=>
                {
                    if (res.length !== 0)
                    {
                        console.log("offers by cat");
                        console.log(res);

                        this.notFound = true;
                        this.offersState = 1;
                        this.offers = res;
                    }
                    else
                    {
                        this.offers = null;
                        this.notFound = false;
                    }
                } , ()=>
                {
                    this.showServerError();
                });
        }
        else if (catId === null)
        {
            this.getAllStores();
            this.getAllOffers();
        }
    }

    getAllOffers()
    {
        this.favoriteIcon = true;
       this.offersProvider.getAllOffers(this.pageSize , 1)
           .subscribe((res)=>
           {
               if (res.length !== 0)
               {
                   console.log("all offers");
                   console.log(res);

                   this.notFound = true;
                   this.offers = res;
                   this.offersState = 0;
               }
               else
               {
                   this.offers = null;
                   this.notFound = false;
               }
           } , ()=>
           {
               this.showServerError();
           })
    }

    getOffersByStore(storeId)
    {
        this.favoriteIcon = true;
        this.selectedStore = storeId;
        this.storeId = storeId;


        if(this.catId !== null && storeId !== null)
      {
         this.offersProvider.getOffersByCatStore(this.catId , storeId , 1 , this.pageSize)
             .subscribe((res)=>
             {
                 if (res.length !== 0)
                 {
                     console.log("offers by cat store");
                     console.log(res);

                     this.notFound = true;
                     this.offers = res;
                     this.offersState = 3;

                 }
                 else
                 {
                     this.offers = null;
                     this.notFound = false;
                 }
             }, ()=>
             {
                 this.showServerError();
             })
      }
      else if (storeId !== null && this.catId === null)
      {
          this.offersProvider.getOffersByStore(storeId , 1 , this.pageSize)
              .subscribe((res)=>
              {
                  if (res.length !== 0)
                  {
                      console.log("offers by store");
                      console.log(res);

                      this.notFound = true;
                      this.offers = res;
                      this.offersState = 2;
                  }
                  else
                  {
                      this.offers = null;
                      this.notFound = false;
                  }
              }, ()=>
              {
                  this.showServerError();
              })
      }
      else if (this.catId !== null && storeId === null)
      {
          this.getByCat(this.catId);
      }
      else if (this.catId === null && storeId === null)
      {
          this.getAllOffers();
      }
    }

    getFavoriteOffers()
    {
        this.favoriteIcon = false;

        this.selectedStore = -1;

        this.offersProvider.getFavorites( this.loginName , 1 , this.pageSize)
            .subscribe((res)=>
            {
                if (res.length !== 0)
                {
                    console.log("favorite offers");
                    console.log(res);

                    this.notFound = true;
                    this.offers = res;
                    this.offersState = 4;
                }
                else
                {
                    this.offers = null;
                    this.notFound = false;
                }
            }, ()=>
            {
                this.showServerError();
            })
    }
    addFavorite(offer)
    {
        let model =
            {
                LoginName : this.loginName ,
                OfferID : offer.offerID ,
                unitPrice: offer.unitPrice,
                offerName:  offer.offerName
            };

      this.offersProvider.addToFavorites(model)
          .subscribe((res)=>
          {
              console.log("after add success");
              console.log(res);
          } , ()=>
          {
              this.showServerError();
          })
    }

    deleteFavorite(offer)
    {
       this.offersProvider.deleteFavorites(offer , this.loginName)
           .subscribe(()=>
           {
              this.getFavoriteOffers();
           } , (err)=>
           {
               this.showServerError();
           })
    }

  presentPopover(myEvent)
  {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
  }
  openBarcodePage()
 {
    this.navCtrl.push("barcode");
  }

  doInfinite(infinite)
  {
    if (this.offersState !== null)
    {
        switch (this.offersState)
        {
            case 0:
                this.pageCounter[1] = 2;
                this.pageCounter[2]= 2;
                this.pageCounter[3]= 2;
                this.pageCounter[4]= 2;

                this.offersProvider.getAllOffers( this.pageSize , this.pageCounter[0])
                    .subscribe((res)=>
                    {
                        if (res.length !== 0)
                        {
                            res.forEach((item)=>
                            {
                                this.offers.push(item);
                            });

                            console.log("infinte scroll");
                            console.log(this.offers);

                            this.offersState = 0;
                            this.pageCounter[0]++;
                        }
                        else
                        {
                            this.noMore();
                        }
                    } , ()=>
                    {
                        this.showServerError();
                    } , ()=>
                    {
                        this.noMoreHidden = true;
                        infinite.complete();
                    });
                break;
  // --------------------------------------------------------------
            case 1:
                this.pageCounter[0] = 2;
                this.pageCounter[2]= 2;
                this.pageCounter[3]= 2;
                this.pageCounter[4]= 2;

                this.offersProvider.getOffersByCat(this.catId , this.pageCounter[1] , this.pageSize)
                    .subscribe((res)=>
                    {
                       if (res.length !== 0)
                       {
                           res.forEach((item)=>
                           {
                               this.offers.push(item);
                           });
                           this.offersState = 1;
                           this.pageCounter[1]++;
                       }
                       else
                       {
                           this.noMore();
                       }
                    } , ()=>
                    {
                        this.showServerError();
                    } , ()=>
                    {
                        this.noMoreHidden = true;
                        infinite.complete();
                    });
                break;
// --------------------------------------------------------------

            case 2:
                this.pageCounter[0] = 2;
                this.pageCounter[1]= 2;
                this.pageCounter[3]= 2;
                this.pageCounter[4]=2;

                this.offersProvider.getOffersByStore(this.storeId , this.pageCounter[2] , this.pageSize)
                    .subscribe((res)=>
                    {
                        if (res.length !== 0)
                        {
                            res.forEach((item)=>
                            {
                                this.offers.push(item);
                            });
                            this.offersState = 2;
                            this.pageCounter[2]++;
                        }
                        else
                        {
                            this.noMore();
                        }
                    }, ()=>
                    {
                        this.showServerError();
                    } , ()=>
                    {
                        this.noMoreHidden = true;
                        infinite.complete();
                    });
                break;
// --------------------------------------------------------------

            case 3:
                this.pageCounter[0] = 2;
                this.pageCounter[1]= 2;
                this.pageCounter[2]= 2;
                this.pageCounter[4]= 2;

                this.offersProvider.getOffersByCatStore(this.catId , this.storeId , this.pageCounter[3] , this.pageSize)
                    .subscribe((res)=>
                    {
                        if (res.length !== 0)
                        {
                            res.forEach((item)=>
                            {
                                this.offers.push(item);
                            });

                            this.offersState = 3;
                            this.pageCounter[3]++;
                        }
                        else
                        {
                            this.noMore();
                        }
                    }, ()=>
                    {
                        this.showServerError();
                    } , ()=>
                    {
                        this.noMoreHidden = true;
                        infinite.complete();
                    });
                break;
    // --------------------------------------------------------------
            case 4:
                this.pageCounter[0] = 2;
                this.pageCounter[1]= 2;
                this.pageCounter[2]= 2;
                this.pageCounter[3]= 2;

                this.offersProvider.getFavorites(this.loginName  , this.pageCounter[4] ,  this.pageSize)
                    .subscribe((res)=>
                    {
                        if (res.length !== 0)
                        {
                            res.forEach((item)=>
                            {
                                this.offers.push(item);
                            });

                            console.log("infinte scroll");
                            console.log(this.offers);

                            this.offersState = 4;
                            this.pageCounter[4]++;
                        }
                        else
                        {
                            this.noMore();
                        }
                    } , ()=>
                    {
                        this.showServerError();
                    } , ()=>
                    {
                        infinite.complete();
                        this.noMoreHidden = true;
                    });
                break;

            default:
                console.log("what to do");
                break;
        }
    }
  }

  showServerError()
  {
      this.alertCtrl.create(
          {
              title : "Server Error",
              message : "Please try again later",
              buttons : ["Ok"]
          }
      ).present();
  }

    noMore()
    {
        this.noMoreHidden = false;
    }
  changeFilter(value) {
    this.catsFilter = value;
  }
}
