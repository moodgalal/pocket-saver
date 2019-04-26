import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NurseHospitalPage } from './nurse-hospital';

@NgModule({
  declarations: [
    NurseHospitalPage,
  ],
  imports: [
    IonicPageModule.forChild(NurseHospitalPage),
  ],
  exports: [
    NurseHospitalPage
  ]
})
export class NurseHospitalPageModule {}
