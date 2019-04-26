import { Component} from '@angular/core';
import { App, ViewController } from 'ionic-angular';
// import { NativeStorage } from '@ionic-native/native-storage';
 import { Storage } from '@ionic/storage';

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  username : string = "";
popoverItemList: Array<{title: string, icon: string, component: any}>;

  constructor(private viewCtrl: ViewController, public appCtrl: App , private storage : Storage) {

     storage.get("username")
         .then((user)=>
         {
           this.username = user;
           this.popoverItemList = [
             { title: this.username, icon: 'person', component: "profile"}
           ];
         });


  }

  selectedItem(item){
  	this.viewCtrl.dismiss();
  	this.appCtrl.getRootNav().setRoot(item.component);
  }
}
