import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankDecriptionPage } from './bank-decription';

@NgModule({
  declarations: [
    BankDecriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(BankDecriptionPage),
  ],
  exports: [
    BankDecriptionPage
  ]
})
export class BankDecriptionPageModule {}
