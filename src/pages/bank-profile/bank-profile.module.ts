import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankProfilePage } from './bank-profile';

@NgModule({
  declarations: [
    BankProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(BankProfilePage),
  ],
  exports: [
    BankProfilePage
  ]
})
export class BankProfilePageModule {}
