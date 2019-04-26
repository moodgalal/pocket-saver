import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankBranshesListPage } from './bank-branshes-list';

@NgModule({
  declarations: [
    BankBranshesListPage,
  ],
  imports: [
    IonicPageModule.forChild(BankBranshesListPage),
  ],
  exports: [
    BankBranshesListPage
  ]
})
export class BankBranshesListPageModule {}
