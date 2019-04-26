import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClinicPage } from './clinic';

@NgModule({
  declarations: [
    ClinicPage,
  ],
  imports: [
    IonicPageModule.forChild(ClinicPage),
  ],
  exports: [
    ClinicPage
  ]
})
export class ClinicPageModule {}
