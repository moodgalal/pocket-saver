import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorsPage } from './doctors';

@NgModule({
  declarations: [
    DoctorsPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorsPage),
  ],
  exports: [
    DoctorsPage
  ]
})
export class DoctorsPageModule {}
