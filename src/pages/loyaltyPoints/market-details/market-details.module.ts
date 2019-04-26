import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketDetailsPage } from './market-details';

@NgModule({
  declarations: [
    MarketDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MarketDetailsPage),
  ],
  exports: [
    MarketDetailsPage
  ]
})
export class MarketDetailsPageModule {}
