import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: "doctor-specialist"
})
@Component({
  selector: 'page-medical-doctors-doctorspecialist',
  templateUrl: 'medical-doctors-doctorspecialist.html',
})
export class MedicalDoctorsDoctorspecialistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicalDoctorsDoctorspecialistPage');
  }

  goToProfile(pageName: string) {
    this.navCtrl.push(pageName);
  }

}
