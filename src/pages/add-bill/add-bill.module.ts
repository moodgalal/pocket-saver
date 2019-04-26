import { NgModule  , CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBillPage } from './add-bill';

@NgModule({
  declarations: [
    AddBillPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBillPage),
  ],
  exports: [
    AddBillPage
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class AddBillPageModule {}
