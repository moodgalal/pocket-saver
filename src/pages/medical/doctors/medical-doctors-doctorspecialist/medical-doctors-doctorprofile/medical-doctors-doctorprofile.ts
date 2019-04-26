import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MedicalDoctorsDoctorprofilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: "doctor-profile"
})
@Component({
  selector: 'page-medical-doctors-doctorprofile',
  templateUrl: 'medical-doctors-doctorprofile.html',
})
export class MedicalDoctorsDoctorprofilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicalDoctorsDoctorprofilePage');
  }
  goTo(pageName: string) {
    this.navCtrl.push(pageName);
  }

}
