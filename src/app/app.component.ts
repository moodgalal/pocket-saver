import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, AlertController, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
// import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase'

import {EntryPage} from '../pages/entry/entry';
import {HomePage} from "../pages/home/home";
import {User} from "../models/user";
import {Observable} from "rxjs/Observable";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage : any = EntryPage;
  username : string;
  public usersRef$: Observable<User[]>  = null;
  sender : User;

    // unsubscribe = this.af.authState.subscribe((user: firebase.User) =>{
    //     if (!user) {
    //         this.rootPage = EntryPage;
    //     } else {
    //         this.rootPage =  HomePage;
    //     }
    // });

  pages: Array<{title: string,icon : string ,component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              private alertCtrl : AlertController,
              private storage : Storage,
              public af: AngularFireAuth,
              private toast : ToastController,
              private afDB: AngularFireDatabase
  ){
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Fawateri',icon: 'home' , component: HomePage },
      { title: 'Loyalty Points',icon: 'star' , component: "points" },
      { title: 'Last Offers',icon: 'logo-usd' , component: "offers" },
      { title: 'Todo list',icon: 'list' , component: "points" },
        { title: 'Calender',icon: 'alarm' , component: "points" },
        // { title: 'Company Profile',icon: 'person' , component: "company-profile" },
        { title: 'Categories',icon: 'albums' , component: "our-category" },
        { title: 'bank profile',icon: 'home' , component: "bank-profile" },
      { title: 'bank branches',icon: 'home' , component: "bank-branches" },
      { title: 'Notifications',icon: 'home' , component: "notifications" },
        // { title: 'Single category',icon: 'person' , component: "single-category" },
        // { title: 'fawatery by date',icon: 'person' , component: "fawateri-by-date" },
        //
        // { title: 'fawatery by category',icon: 'person' , component: "fawateri-by-cat" },
        // { title: 'fawatery by store',icon: 'person' , component: "fawateri-by-store" },
        // { title: 'view fatora',icon: 'cart' , component: "view-fa" },
    ];

    this.usersRef$ = this.afDB.list("users");
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

        this.storage.get("customerName")
            .then((res)=>
            {
                this.username = res;
            })
    });
  }

  openPage(page)
  {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  goArabic()
  {
      this.nav.push("points");
  }

    goProfile()
    {
        this.nav.push("profile");
    }
  doLogout(){

      let confirm = this.alertCtrl.create({
        title: 'Logout ?',
        message: 'Do you want to logout ?',
        buttons: [
          {
            text: 'No',
          },
          {
            text: 'Yes',
            handler: () =>
            {
              this.storage.get("user")
                .then((res)=>
                {
                  this.sender = res;
                  console.log("The user key");
                  console.log(res.$key);
                  this.afDB.database.ref(`users/${this.sender.$key}`).remove()
                    .then(()=> {
                      this.af.auth.signOut()
                        .then(()=>
                        {
                          this.storage.clear()
                            .then(()=>
                            {
                              this.nav.setRoot("login");
                            });
                        });
                    });
                })
                  .catch(()=>
                  {
                      this.toast.create({
                          message : "Try Again Later",
                          duration : 2000,
                          position : "top"
                      }).present();
                  });
            }
          }
        ]
      });
      confirm.present();
      }
}
