import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankStatementsPage } from './bank-statements';

@NgModule({
  declarations: [
    BankStatementsPage,
  ],
  imports: [
    IonicPageModule.forChild(BankStatementsPage),
  ],
  exports: [
    BankStatementsPage
  ]
})
export class BankStatementsPageModule {}
