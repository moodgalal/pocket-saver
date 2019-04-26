import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SigninMethodsPage } from './signin-methods';

@NgModule({
  declarations: [
    SigninMethodsPage,
  ],
  imports: [
    IonicPageModule.forChild(SigninMethodsPage),
  ],
  exports: [
    SigninMethodsPage
  ]
})
export class SigninMethodsPageModule {}
