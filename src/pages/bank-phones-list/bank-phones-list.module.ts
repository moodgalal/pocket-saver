import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankPhonesListPage } from './bank-phones-list';

@NgModule({
  declarations: [
    BankPhonesListPage,
  ],
  imports: [
    IonicPageModule.forChild(BankPhonesListPage),
  ],
  exports: [
    BankPhonesListPage
  ]
})
export class BankPhonesListPageModule {}
