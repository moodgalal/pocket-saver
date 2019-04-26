import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewFatoraPage } from './view-fatora';

@NgModule({
  declarations: [
    ViewFatoraPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewFatoraPage),
  ],
  exports: [
    ViewFatoraPage
  ]
})
export class ViewFatoraPageModule {}
