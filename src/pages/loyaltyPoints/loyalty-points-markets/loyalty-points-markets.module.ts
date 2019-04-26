import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoyaltyPointsMarketsPage } from './loyalty-points-markets';

@NgModule({
  declarations: [
    LoyaltyPointsMarketsPage,
  ],
  imports: [
    IonicPageModule.forChild(LoyaltyPointsMarketsPage),
  ],
  exports: [
    LoyaltyPointsMarketsPage
  ]
})
export class LoyaltyPointsMarketsPageModule {}
