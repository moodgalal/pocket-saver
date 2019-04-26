import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferSubcategoryPage } from './offer-subcategory';

@NgModule({
  declarations: [
    OfferSubcategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(OfferSubcategoryPage),
  ],
  exports: [
    OfferSubcategoryPage
  ]
})
export class OfferSubcategoryPageModule {}
