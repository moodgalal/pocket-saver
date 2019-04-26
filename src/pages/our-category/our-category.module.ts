import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OurCategoryPage } from './our-category';

@NgModule({
  declarations: [
    OurCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(OurCategoryPage),
  ],
  exports: [
    OurCategoryPage
  ]
})
export class OurCategoryPageModule {}
