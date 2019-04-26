import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankBranchesPage } from './bank-branches';

@NgModule({
  declarations: [
    BankBranchesPage,
  ],
  imports: [
    IonicPageModule.forChild(BankBranchesPage),
  ],
  exports: [
    BankBranchesPage
  ]
})
export class BankBranchesPageModule {}
