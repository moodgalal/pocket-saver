import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalDoctorsDoctorprofilePage } from './medical-doctors-doctorprofile';

@NgModule({
  declarations: [
    MedicalDoctorsDoctorprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(MedicalDoctorsDoctorprofilePage),
  ],
  exports: [
    MedicalDoctorsDoctorprofilePage
  ]
})
export class MedicalDoctorsDoctorprofilePageModule {}
