import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtherRecieptListPage } from './other-reciept-list';

@NgModule({
  declarations: [
    OtherRecieptListPage,
  ],
  imports: [
    IonicPageModule.forChild(OtherRecieptListPage),
  ],
  exports: [
    OtherRecieptListPage
  ]
})
export class OtherRecieptListPageModule {}
