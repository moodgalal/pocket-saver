import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FawateriByDatePage } from './fawateri-by-date';

@NgModule({
  declarations: [
    FawateriByDatePage,
  ],
  imports: [
    IonicPageModule.forChild(FawateriByDatePage),
  ],
  exports: [
    FawateriByDatePage
  ]
})
export class FawateriByDatePageModule {}
