"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var popover_1 = require("../../components/popover/popover");
var HomePage = (function () {
    function HomePage(navCtrl, navParams, splashScreen, popoverCtrl, alertCtrl, storage, provider, af, loader, modalCtrl, tracker, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.splashScreen = splashScreen;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.provider = provider;
        this.af = af;
        this.loader = loader;
        this.modalCtrl = modalCtrl;
        this.tracker = tracker;
        this.toast = toast;
        this.duration = null;
        this.pdf = null;
        this.splashScreen.hide();
    }
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.loading = this.loader.create({
            content: "Please wait...",
            enableBackdropDismiss: true,
            dismissOnPageChange: true
        });
        this.loading.present();
        this.storage.getItem("username")
            .then(function (res) {
            if (res != null) {
                _this.username = res;
                console.log("user in home");
                console.log(_this.username);
                _this.storage.getItem("duration")
                    .then(function (res) {
                    console.log("duration in home");
                    console.log(_this.duration);
                    _this.duration = res;
                    if (_this.duration > 0 && _this.duration !== null) {
                        try {
                            _this.storage.getItem("duration")
                                .then(function (res) {
                                _this.duration = res;
                                _this.tracker.startTracking(_this.username, _this.duration);
                            });
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                });
                _this.provider.getBills(_this.username)
                    .subscribe(function (bills) {
                    _this.loading.dismiss();
                    console.log(bills);
                    _this.bills = bills;
                });
            }
        }).catch(function (err) {
            _this.loading.dismiss();
            _this.alertCtrl.create({
                title: "Something went wrong !",
                message: "Login again please !",
                buttons: [
                    {
                        text: "Login",
                        handler: function () {
                            _this.storage.remove("username")
                                .then(function () {
                                _this.navCtrl.setRoot("email_login");
                            });
                        }
                    }
                ]
            }).present();
        });
    };
    /*ionViewCanEnter()
    {
      this.af.authState.subscribe((data) => {
        if (data && data.email && data.uid)
        {
           console.log("in home")
        }
        else
        {
          this.navCtrl.setRoot("login")
        }
      });
    } */
    HomePage.prototype.doRefresh = function (event) {
        var _this = this;
        this.provider.getBills(this.username)
            .subscribe(function (bills) {
            console.log(bills);
            _this.bills = bills;
        });
        setTimeout(function () { event.complete(); }, 2000);
    };
    HomePage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(popover_1.PopoverComponent);
        popover.present({
            ev: myEvent
        });
    };
    HomePage.prototype.addBill = function () {
        this.navCtrl.push("addBill");
    };
    HomePage.prototype.goEdit = function (bill) {
        this.navCtrl.push("editBill", { billInfo: bill });
    };
    HomePage.prototype.getBillsByDate = function () {
        var _this = this;
        this.alertCtrl.create({
            title: "Get Bills From:",
            inputs: [
                {
                    name: "dateFrom",
                    type: "date",
                    placeholder: "From"
                },
                {
                    name: "dateTo",
                    type: "date",
                    placeholder: "To"
                }
            ],
            buttons: [
                {
                    text: "Cancel"
                },
                {
                    text: "Find",
                    handler: function (data) {
                        console.log("from" + data.dateFrom);
                        console.log("to" + data.dateTo);
                        _this.loading.present();
                        _this.provider.getBillsByDate(_this.username, data.dateFrom, data.dateTo)
                            .subscribe(function (res) {
                            _this.loading.dismiss();
                            if (typeof res == 'string') {
                                _this.alertCtrl.create({
                                    title: "Not Found !",
                                    message: res,
                                    buttons: ["Ok"]
                                }).present();
                            }
                            else {
                                _this.bills = res;
                            }
                        });
                    }
                }
            ]
        }).present();
    };
    HomePage.prototype.showMap = function (bill) {
        if (bill.latitude !== null && bill.longitude !== null)
            this.modalCtrl.create("map").present();
    };
    HomePage.prototype.openBarcodePage = function () {
        this.navCtrl.push("barcode");
    };
    HomePage.prototype.deleteBill = function (id) {
        var _this = this;
        console.log("in the begin of the dlete");
        this.alertCtrl.create({
            title: "Confirm",
            message: "Are you sure you want to delete this bill ?",
            buttons: [
                {
                    text: "Cancel",
                    role: "cancel"
                },
                {
                    text: "Delete",
                    handler: function () {
                        try {
                            _this.loading.present();
                            console.log("deelet id");
                            console.log(id);
                            _this.provider.deleteBill(id)
                                .subscribe(function () {
                                console.log("inside the deelete function");
                                _this.provider.getBills(_this.username)
                                    .subscribe(function (bills) {
                                    _this.loading.dismiss();
                                    console.log(bills);
                                    _this.bills = bills;
                                });
                                _this.toast.create({
                                    message: "Bill has been deleted",
                                    duration: 2000,
                                    position: "top"
                                }).present();
                            });
                        }
                        catch (e) {
                            _this.toast.create({
                                message: "Error has been occurred",
                                duration: 2000,
                                position: "top"
                            }).present();
                        }
                    }
                }
            ]
        }).present();
    };
    return HomePage;
}());
HomePage = __decorate([
    core_1.Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    })
], HomePage);
exports.HomePage = HomePage;
