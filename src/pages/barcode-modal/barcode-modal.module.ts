import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarcodeModalPage } from './barcode-modal';

@NgModule({
  declarations: [
    BarcodeModalPage,
  ],
  imports: [
    IonicPageModule.forChild(BarcodeModalPage),
  ],
  exports: [
    BarcodeModalPage
  ]
})
export class BarcodeModalPageModule {}
