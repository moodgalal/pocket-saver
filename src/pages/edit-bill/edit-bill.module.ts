import { NgModule  , CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditBillPage } from './edit-bill';

@NgModule({
  declarations: [
    EditBillPage,
  ],
  imports: [
    IonicPageModule.forChild(EditBillPage),
  ],
  exports: [
    EditBillPage
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class EditBillPageModule {}
