import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankAtmListPage } from './bank-atm-list';

@NgModule({
  declarations: [
    BankAtmListPage,
  ],
  imports: [
    IonicPageModule.forChild(BankAtmListPage),
  ],
  exports: [
    BankAtmListPage
  ]
})
export class BankAtmListPageModule {}
