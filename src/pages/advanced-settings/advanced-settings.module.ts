import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvancedSettingsPage } from './advanced-settings';

@NgModule({
  declarations: [
    AdvancedSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdvancedSettingsPage),
  ],
  exports: [
    AdvancedSettingsPage
  ]
})
export class AdvancedSettingsPageModule {}
