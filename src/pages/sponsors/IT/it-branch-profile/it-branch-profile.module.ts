import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItBranchProfilePage } from './it-branch-profile';

@NgModule({
  declarations: [
    ItBranchProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ItBranchProfilePage),
  ],
  exports: [
    ItBranchProfilePage
  ]
})
export class ItBranchProfilePageModule {}
