import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FawateriByCategoryPage } from './fawateri-by-category';

@NgModule({
  declarations: [
    FawateriByCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(FawateriByCategoryPage),
  ],
  exports: [
    FawateriByCategoryPage
  ]
})
export class FawateriByCategoryPageModule {}
