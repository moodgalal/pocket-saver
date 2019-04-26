"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PopoverComponent = (function () {
    function PopoverComponent(viewCtrl, appCtrl, storage) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.appCtrl = appCtrl;
        this.storage = storage;
        this.username = "";
        storage.getItem("username")
            .then(function (user) {
            _this.username = user;
            _this.popoverItemList = [
                { title: _this.username, icon: 'person', component: "profile" }
            ];
        });
    }
    PopoverComponent.prototype.selectedItem = function (item) {
        this.viewCtrl.dismiss();
        this.appCtrl.getRootNav().setRoot(item.component);
    };
    return PopoverComponent;
}());
PopoverComponent = __decorate([
    core_1.Component({
        selector: 'popover',
        templateUrl: 'popover.html'
    })
], PopoverComponent);
exports.PopoverComponent = PopoverComponent;
