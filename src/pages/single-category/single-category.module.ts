import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleCategoryPage } from './single-category';

@NgModule({
  declarations: [
    SingleCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleCategoryPage),
  ],
  exports: [
    SingleCategoryPage
  ]
})
export class SingleCategoryPageModule {}
