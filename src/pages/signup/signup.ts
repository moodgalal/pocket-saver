import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SignupProvider} from "../../providers/signup/go-green-server";

@IonicPage({
  name: "signup"
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	
  currencies : Array<any>;
  genders : Array<any>;
  userError = false;
    MobileModel : any =
        {
            loginName: null,
            customerName: null,
            customerEmail: null,
            loginPassword: null,
            confirmPasswrod: null,
            birthdate: null,
            currencyCode: null,
            decimalDigit: null,
            genderID: null,
            phoneNumber: null,
            CountryCode: null,
            CityCode: null,
            BlockCode: null
        };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private server : SignupProvider
  ) {

  }

  ionViewDidLoad()
  {
      this.getCurrencies();
  }

  getCurrencies()
  {
    this.server.getCurrencies().subscribe((res)=>
    {
      this.currencies = res;
        console.log("cureencies");
        console.log(this.currencies);
    })
  }

  doSignup(formData)
  {
     if (formData)
     {

         console.log(formData);
         this.MobileModel =
             {
                 loginName: formData.value.userLoginNumber,
                 customerName: formData.value.username,
                 customerEmail: formData.value.mail,
                 loginPassword: formData.value.password,
                 confirmPasswrod: formData.value.confirmPassword,
                 birthdate: formData.value.date,
                 currencyCode: formData.value.currency.currencyCode.trim(),
                 decimalDigit: formData.value.currency.decimalDigit,
                 genderID: formData.value.gender,
                 phoneNumber: formData.value.phone,
                 CountryCode: null,
                 CityCode: null,
                 BlockCode: null
             };
         this.navCtrl.push("countries" , {model : this.MobileModel});
     }
  }
  checkUser(user)
  {
      this.server.checkUser(user.trim())
          .subscribe((res)=>
          {
              console.log(res);
              if (res.result == true)
              {
                this.userError = false;
              }
              else if (res.result == false)
              {
                  this.userError = true;
              }
          });
  }
  goLogin(){
    this.navCtrl.setRoot("login");
  }


}
