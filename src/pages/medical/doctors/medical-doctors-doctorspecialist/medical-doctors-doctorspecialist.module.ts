import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalDoctorsDoctorspecialistPage } from './medical-doctors-doctorspecialist';

@NgModule({
  declarations: [
    MedicalDoctorsDoctorspecialistPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicalDoctorsDoctorspecialistPage),
  ],
  exports: [
    MedicalDoctorsDoctorspecialistPage
  ]
})
export class MedicalDoctorsDoctorspecialistPageModule {}
