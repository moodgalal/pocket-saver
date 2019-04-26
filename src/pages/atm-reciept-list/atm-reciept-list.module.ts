import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtmRecieptListPage } from './atm-reciept-list';

@NgModule({
  declarations: [
    AtmRecieptListPage,
  ],
  imports: [
    IonicPageModule.forChild(AtmRecieptListPage),
  ],
  exports: [
    AtmRecieptListPage
  ]
})
export class AtmRecieptListPageModule {}
