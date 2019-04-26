import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FawateriByStorePage } from './fawateri-by-store';

@NgModule({
  declarations: [
    FawateriByStorePage,
  ],
  imports: [
    IonicPageModule.forChild(FawateriByStorePage),
  ],
  exports: [
    FawateriByStorePage
  ]
})
export class FawateriByStorePageModule {}
