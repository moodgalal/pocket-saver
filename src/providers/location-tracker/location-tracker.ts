// import { Injectable, NgZone } from '@angular/core';
// import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
// import { Geolocation } from '@ionic-native/geolocation';
// import 'rxjs/add/operator/filter';
// import {Http, Headers} from "@angular/http";
// import { NativeStorage } from '@ionic-native/native-storage';

//@Injectable()
export class LocationTrackerProvider {
//
//   public watch : any;
//   public lat: number = 0;
//   public lng: number = 0;
//   public  duration : number;
//   public user : string;
//
//   constructor(public zone: NgZone ,
//               private backgroundGeolocation : BackgroundGeolocation ,
//               private geolocation : Geolocation,
//               private http : Http,
//   ) {
//
//   }
//
//   startTracking(user , duration)
//   {
//     const header = new Headers({"Content-Type" : "application/json"});
//     this.duration = duration;
//
//     this.user = user;
//     try {
//
//       // Background Tracking
//
//       let config = {
//         desiredAccuracy: 0,
//         stationaryRadius: 20,
//         distanceFilter: 10,
//         debug: false,
//         interval: this.duration * 1000,
//         startOnBoot: true,
//         stopOnTerminate: false
//       };
//
//       this.backgroundGeolocation.configure(config).subscribe((location) => {
//
//         console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
//
//
//         // Run update inside of Angular's zone
//         this.zone.run(() => {
//           this.lat = location.latitude;
//           this.lng = location.longitude;
//
//           if (this.lat !== 0 || this.lng !==0) {
//
//             let model =
//                 {
//                   latitude: this.lat,
//                   longitude: this.lng,
//                   loginName: user
//                 };
//
//             this.http.post(`http://173.212.224.45:2020/api/user/sentLocation` , JSON.stringify(model) , {headers : header} ).subscribe(() => {
//               console.log("Sending to the server" + this.lng + "lat" + this.lat)
//             }, (err) => {
//               console.log(err);
//             })
//           }
//         });
//
//       }, (err) => {
//
//         console.log(err);
//
//       });
//
//       // Turn ON the background-geolocation system.
//       this.backgroundGeolocation.start();
//
//     // Foreground Tracking
//
//     let options = {
//       enableHighAccuracy: true
//     };
//
//      this.watch =  setInterval(()=>
//       {
//         try
//         {
//           this.geolocation.getCurrentPosition(options).then((position) => {
//
//             console.log(position);
//             console.log(this.duration);
//
//             // Run update inside of Angular's zone
//             this.zone.run(() => {
//               this.lat = position.coords.latitude;
//               this.lng = position.coords.longitude;
//
//               if (this.lat !== 0 || this.lng !==0)
//               {
//                 let model =
//                     {
//                       latitude: this.lat,
//                       longitude: this.lng,
//                       loginName: user
//                     };
//
//                 this.http.post(`http://173.212.224.45:2020/api/user/sentLocation` , JSON.stringify(model) , {headers : header} ).subscribe(()=>
//                 {
//                   console.log("Sending to the server" + this.lng + "lat" + this.lat)
//                 }, (err)=>
//                 {
//                   console.log(err);
//                 })
//               }
//             });
//
//           });
//         }
//         catch (e)
//         {
//           console.log(e);
//         }
//       } , this.duration*1000)
//     }
//     catch(e)
//     {
//       console.log(e)
//     }
//   }
//
//   stopTracking()
//   {
//
//     console.log('stopTracking');
//
//     this.backgroundGeolocation.finish();
//     clearInterval(this.watch);
//   }
 }
