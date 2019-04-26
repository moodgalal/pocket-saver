import { NgModule ,  NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OffersPage } from './offers';

@NgModule({
  declarations: [
    OffersPage,
  ],
  imports: [
    IonicPageModule.forChild(OffersPage),
  ],
  exports: [
    OffersPage
  ],
  schemas : [NO_ERRORS_SCHEMA]

})
export class OffersPageModule {}
