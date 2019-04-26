import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationProvider {

  constructor(public http: Http) { }

  sendNotification(token : string  , senderToken : string  , email : string , message : string , type : string ) {
    let body = {
      "notification":{
        "title":"New Notification has arrived",
        "body": `${message}`,
        "sound":"default",
        "click_action":"FCM_PLUGIN_ACTIVITY",
        "icon":"fcm_push_icon"
      },
      "data":{
        "senderToken": senderToken,
        "senderEmail" : email,
        "type": type,
        "message" : `${message}`
      },
      "to":`${token}`,
      "priority":"high",
      "restricted_package_name":""
    };

    let options = new Headers();
    options.append('Content-Type' , 'application/json');
    options.append('Authorization' , 'key=AAAAo8IhWDA:APA91bHDSUJb2DXub-Fw8GYxXmTynUPMUCYICPE7wBseixO1SRDSjmPWzrLsvVHLTBB5srWVNacgklQAzHfZ7pH4k9qXWaAcWvdPlMhEnpO7VlQCaErAnMbKQLGXe6IktBz54wlsiPxd');

    return this.http.post(
      "https://fcm.googleapis.com/fcm/send",
      body,
      {headers: options});
  }
}
