import { NgModule , NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarcodePage } from './barcode';

@NgModule({
  declarations: [
    BarcodePage,
  ],
  imports: [
    IonicPageModule.forChild(BarcodePage),
  ],
  exports: [
    BarcodePage
  ] ,
  schemas : [NO_ERRORS_SCHEMA]

})
export class BarcodePageModule {}
