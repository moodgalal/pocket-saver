import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlocksPage } from './blocks';

@NgModule({
  declarations: [
    BlocksPage,
  ],
  imports: [
    IonicPageModule.forChild(BlocksPage),
  ],
  exports: [
    BlocksPage
  ]
})
export class BlocksPageModule {}
