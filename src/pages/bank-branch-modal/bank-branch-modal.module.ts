import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankBranchModalPage } from './bank-branch-modal';

@NgModule({
  declarations: [
    BankBranchModalPage,
  ],
  imports: [
    IonicPageModule.forChild(BankBranchModalPage),
  ],
  exports: [
    BankBranchModalPage
  ]
})
export class BankBranchModalPageModule {}
