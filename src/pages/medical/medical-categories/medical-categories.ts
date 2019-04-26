import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'medical-categories'
})
@Component({
  selector: 'page-medical-categories',
  templateUrl: 'medical-categories.html',
})
export class MedicalCategoriesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicalCategoriesPage');
  }

  goToContent(pageName: string) {
    this.navCtrl.push(pageName);
  }

}
