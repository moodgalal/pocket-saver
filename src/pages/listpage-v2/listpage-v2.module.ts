import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListpageV2Page } from './listpage-v2';

@NgModule({
  declarations: [
    ListpageV2Page,
  ],
  imports: [
    IonicPageModule.forChild(ListpageV2Page),
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListpageV2PageModule {}
