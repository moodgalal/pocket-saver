import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  name:"bank-branches"
})
@Component({
  selector: 'page-bank-branches',
  templateUrl: 'bank-branches.html',
})
export class BankBranchesPage {

  allBanks : Array<string> = [
      "Kuwait Finance House",
      "National Bank of Bahrain" ,
    "Central Bank of Bahrain" ,
    "Bank of Bahrain and Kuwait",
    "Bank Muscat International" ,
    "Bahrain Development Bank" ,
    "Bahrain Middle East Bank",
      "Ahli United Bank",
      "United Gulf Bank",
      "Al Salam Bank BSC",
      "International Investment Bank",
      "Shamil Bank of Bahrain",
      "Citibank Bahrain",
      "Taib Bank - Bahrain",
      "Bahrain Credit Bank",
      "HSBC Bahrain",
      "Arab Bank Bahrain",
      "Gulf International Bank B.S.C.",
      "Addax Investment Bank",
      "Bank of Tokyo Mitsubishi UFJ",
      "State Bank of India, Bahrain"
  ];
  banks : Array<string> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.initialize();
  }

  goBankProfile()
  {
    this.navCtrl.push("bank-profile");
  }

  initialize()
  {
     this.banks = this.allBanks;
  }
  filter(event)
  {
    let value = event.target.value;

      this.initialize();

    if (value && value.trim() != '')
    {
      this.banks = this.banks.filter(item => {
        return item.toLowerCase().indexOf(value.toLowerCase()) > -1
      })
    }
  }
}
