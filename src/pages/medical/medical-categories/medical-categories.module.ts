import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalCategoriesPage } from './medical-categories';

@NgModule({
  declarations: [
    MedicalCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicalCategoriesPage),
  ],
  exports: [
    MedicalCategoriesPage
  ]
})
export class MedicalCategoriesPageModule {}
