import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItBranchesPage } from './it-branches';

@NgModule({
  declarations: [
    ItBranchesPage,
  ],
  imports: [
    IonicPageModule.forChild(ItBranchesPage),
  ],
  exports: [
    ItBranchesPage
  ]
})
export class ItBranchesPageModule {}
