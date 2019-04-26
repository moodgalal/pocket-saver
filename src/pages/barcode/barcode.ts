import {Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover'
import JsBarcode from 'jsbarcode';
import { Storage } from '@ionic/storage';
// import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage({
    name:"barcode"
})
@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html',
})
export class BarcodePage
{
    @ViewChild('barcode') barcode: ElementRef;
    username = "";
    clock : number = Date.now();
    barcodeClockTimer;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              private storage : Storage
  ) {}

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
  }
  ionViewDidEnter()
  {
      this.storage.get("username")
          .then((res)=>
          {
              console.log("username  "+ res);
              this.username = res;

              if (this.username != null)
              {
                  JsBarcode(this.barcode.nativeElement, this.username ,
                      {
                          format : "CODE128",
                          lineColor: "#191919",
                          width:2,
                          height:200,
                          marginTop : 30,
                          marginBottom : 30,
                      });
              }
          });

      let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let d = new Date();

    document.getElementById("date").innerHTML = days[d.getDay()] + " , " + d.getMonth() + " " + d.getFullYear();
    this.startTime();
  }
 

  goBack(){
    this.navCtrl.pop();
      clearInterval(this.barcodeClockTimer);
  }

    startTime()
    {
       this.barcodeClockTimer = setInterval(()=>
       {
          this.clock = Date.now()
       }, 500)
    }

}


