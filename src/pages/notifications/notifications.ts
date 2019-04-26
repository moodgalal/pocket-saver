import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {User} from "../../models/user";
import {AngularFireDatabase} from "angularfire2/database";
import {FCM} from "@ionic-native/fcm";
import {NotificationProvider} from "../../providers/notification/notification";
import {AngularFireAuth} from "angularfire2/auth";
import { Storage } from '@ionic/storage';

@IonicPage({
  name : "notifications"
})

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  public usersRef$: Observable<User[]>  = null;
  sender : User;

  constructor(
    public navCtrl: NavController,
    private navParamas : NavParams,
    private afDB: AngularFireDatabase,
    private fcm: FCM,
    private platform : Platform,
    private service: NotificationProvider,
    private afAuth: AngularFireAuth,
    private alertCtrl : AlertController,
    private storage : Storage
  )
  {
    this.usersRef$ = this.afDB.list("users");
    console.log(this.usersRef$);
  }


  ionViewDidLoad()
  {
    this.platform.ready().then(()=> {

      this.storage.get("user")
        .then((res)=>
        {
          this.sender = res;

          this.fcm.onNotification().subscribe((res) =>
          {
            console.log(res);

            if(res.type == "sender")
            {
              this.alertCtrl.create({
                title : "Notification !",
                subTitle : `From: ${res.senderEmail}`,
                message : `${res.message}`,
                buttons : [
                  {
                    text : "Accept",
                    handler : ()=>
                    {
                      this.sendPush(res.senderToken , this.sender.token , this.sender.email,  "I'll take it." , "reciever")
                    }
                  },
                  {
                    text : "Decline",
                    handler : ()=>
                    {
                      this.sendPush(res.senderToken , this.sender.token , this.sender.email, "I can't take it now" , "reciever")
                    }
                  }
                ]
              }).present()
            }
            else
            {
              this.alertCtrl.create({
                title : "Done",
                subTitle : `From: ${res.senderEmail}`,
                message : res.message,
                buttons : ["Ok"]
              }).present();
            }

          });

          this.fcm.onTokenRefresh()
            .subscribe((token)=>
            {
              this.storage.set("user" , this.sender)
                .then(()=>
                {
                  this.sender.token = token;
                  this.afDB.database.ref(`users/${this.sender.$key}`)
                    .update({token : token})
                    .then((res)=>
                    {
                      console.log("Token updated");
                      console.log(res);
                    })
                })
            })
        });
    })
  }

  sendPush(token , senderToken , senderEmail,  message : string , type : string): void
  {
    this.service.sendNotification(token , senderToken , senderEmail , message , type)
      .subscribe((res)=>
      {
        this.alertCtrl.create({
          title : "Done",
          message : "Message sent !",
          buttons : ["Ok"]
        }).present();
      })
  }

}
