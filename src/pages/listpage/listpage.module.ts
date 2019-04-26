import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListpagePage } from './listpage';

@NgModule({
  declarations: [
    ListpagePage,
  ],
  imports: [
    IonicPageModule.forChild(ListpagePage),
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListpagePageModule {}
