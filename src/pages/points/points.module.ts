import { NgModule ,  NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointsPage } from './points';

@NgModule({
  declarations: [
    PointsPage,
  ],
  imports: [
    IonicPageModule.forChild(PointsPage),
  ],
  exports: [
    PointsPage
  ],
  schemas : [NO_ERRORS_SCHEMA]

})
export class PointsPageModule {}
